#!/bin/bash
set -e

cat >> ${PGDATA}/postgresql.conf <<EOF
wal_level = hot_standby
archive_mode = on
archive_command = 'cd .'
max_wal_senders = 8
wal_keep_segments = 8
hot_standby = on
EOF

psql -v ON_ERROR_STOP=1 -U "postgres" -d "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE chat;
    CREATE ROLE registrator LOGIN PASSWORD 'registrator';
    CREATE ROLE selector LOGIN PASSWORD 'selector';
    CREATE ROLE taskworker LOGIN PASSWORD 'taskworker';
    
    ALTER DATABASE bookstore SET search_path = '$user', public, registrator, taskworker;
EOSQL

psql -v ON_ERROR_STOP=1 -U "postgres" -d "chat" <<-EOSQL
    \i /dump.sql
EOSQL