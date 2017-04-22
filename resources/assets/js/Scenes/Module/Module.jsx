import React from 'react'
import BaseComponent from 'js/Components/BaseComponent'
import {connect} from 'react-redux'

import {getModule, setModuleFetching} from 'js/actions/modules'
import {currentModule} from 'js/functions/stateHelpers'

import ModuleDetail from './ModuleDetail'
import ModuleHeader from './ModuleHeader'
import ModuleSidebar from './ModuleSidebar'
import ModuleSummary from './ModuleSummary'

class Module extends BaseComponent {
    componentDidMount() {
        this.props.setModuleFetching(true);
        this.props.getModule(this.props.match.params.id);
    }

    renderComponent() {
        if (this.props.isFetching || this.props.module.id === undefined) {
            return this.renderLoading();
        } else {
            return (
                <div className="row">
                    <div className="col-8">
                        <ModuleHeader module={this.props.module} />
                        <ModuleSummary module={this.props.module} />
                        <ModuleDetail module={this.props.module} />
                    </div>
                    <div className="col">
                        <ModuleSidebar module={this.props.module} />
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="outerContainer p-2">
                {this.renderComponent()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.modules.isFetchingModule,
        module: currentModule(state)
    }
}

export default connect(mapStateToProps, {getModule, setModuleFetching})(Module);