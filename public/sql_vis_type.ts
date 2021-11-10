import {SqlVisDependencies} from "./plugin";

import {SqlRequestHandlerProvider} from "./sql_request_handler_provider";
import {QueryControlsTab} from "./components/editor/query/query_controls_tab";
import {QueryVisOptionTab} from "./components/editor/option/query_vis_option_tab";
import {createSqlVisController} from "./vis_controller";
import {defaultFeedbackMessage} from "../common/feedback_message";
import {DATATABLE_TYPE} from "../common/SqlVIsOptionHelper";

export function createSqlVisTypeDefinition(deps: SqlVisDependencies) {

  const visRequestHandler = SqlRequestHandlerProvider(deps);
  const visController = createSqlVisController(deps);

  return {
    name: 'kbnVisSql',
    title: 'Sql query Visualisation',
    description: 'Create Visualisation for Sql Query .',
    icon: 'visTimelion',
    stage: 'experimental',
    feedbackMessage: defaultFeedbackMessage,
    options: {
      showIndexSelection: false,
      showQueryBar: true,
      showFilterBar: true,
    },
    visualization: visController,
    visConfig: {
      defaults: {
        query: '',
        visType: DATATABLE_TYPE.value,
        useTimeFilter: false,
        isLoading: true,
        exportName: 'default',
      },
    },
    editorConfig: {
      optionTabs: [
        {
          name: 'query_controls',
          title: 'Query',
          editor: QueryControlsTab
        },
        {
          name: 'vis_type',
          title: 'Vis option',
          editor: QueryVisOptionTab
        }
      ]
    },
    requestHandler: visRequestHandler,
    responseHandler: 'none',
  };
}
