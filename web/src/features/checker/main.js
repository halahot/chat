import React from 'react';
import {connect} from 'react-redux';
import {
    check_token,
} from '../../common/api/index'

class Main extends React.Component{
    constructor(props){
        super(props);

        this.props.check();
    }


    render(){
        return(
        <div>
            {this.props.children}
        </div>)
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        check: () => dispatch(check_token()),
    }
}

export default connect(null, mapDispatchToProps)(Main);