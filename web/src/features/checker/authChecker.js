import React from 'react';
import {connect} from 'react-redux';
import {
    init,
} from '../../common/api/index'

class Login extends React.Component{
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

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);