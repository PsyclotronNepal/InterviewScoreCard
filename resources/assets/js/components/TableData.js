import React, {Component} from "react";
import * as ReactDOM from "react-dom";
import * as toastr from 'toastr';

export default class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {content: this.props.children};
        this.changeHandler = this.props.onChange ?
            this.props.onChange :
            function () {
            };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        if (event.target.innerHTML != this.state.content) {
            let current = this;
            $.ajax({
                dataType: "json",
                url: '/api/evaluation_criteria/edit',
                method: "post",
                data: {
                    evaluation_id: event.target.parentNode.getAttribute('data-id'),
                    field_name: current.props.fieldName,
                    value: event.target.innerHTML.trim()
                },
                success: function (response) {
                    if (response.error) {
                        toastr['warning'](response.message, "Error");
                        current.node.innerHTML = current.state.content;
                    } else {
                        current.setState({content: current.node.innerHTML});
                    }
                },
                error: function (err) {
                    current.node.innerHTML = current.state.content;
                    toastr['error'](" Message: " + err.responseJSON.message, "Error while updating changes " + err.status + "]");
                }
            })
        }
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.node.innerHTML = this.state.content;
    }

    render() {
        return <td contentEditable={true} onKeyUp={this.handleChange}></td>
    }
}