"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/activity-center/page",{

/***/ "(app-pages-browser)/./lib/data/activities.ts":
/*!********************************!*\
  !*** ./lib/data/activities.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   activities: function() { return /* binding */ activities; }\n/* harmony export */ });\nconst activities = [\n    {\n        id: 1,\n        name: \"Onboarding: Karl Karlsson\",\n        type: \"Workflow\",\n        status: \"In progress\",\n        progress: 25,\n        description: \"New employee onboarding process for Karl Karlsson, starting April 1st, 2024\",\n        stakeholders: [\n            {\n                name: \"John Davis\",\n                role: \"HR Manager\",\n                image: \"https://i.pravatar.cc/150?u=1\"\n            },\n            {\n                name: \"Sarah Miller\",\n                role: \"Team Lead\",\n                image: \"https://i.pravatar.cc/150?u=2\"\n            }\n        ],\n        workflowId: 1,\n        dueDate: \"2024-04-01\",\n        createdAt: \"2024-03-15T09:00:00\",\n        tasks: [\n            {\n                id: 1,\n                title: \"Send automated email\",\n                subject: \"Welcome to the team \\uD83C\\uDF89\",\n                completed: true,\n                assignee: \"System\",\n                type: \"email\",\n                recipient: \"karl.karlsson@example.com\",\n                content: \"Welcome to the team Karl!\",\n                sendDate: \"2024-03-24T12:00:00\"\n            },\n            {\n                id: 2,\n                title: \"Prepare workstation\",\n                description: \"Set up computer, access cards, and required software\",\n                dueDate: \"2024-03-30\",\n                completed: false,\n                assignee: \"IT Support\",\n                type: \"task\",\n                startDate: \"2024-03-26\"\n            },\n            {\n                id: 3,\n                title: \"Schedule orientation\",\n                description: \"Book introduction meetings with key team members\",\n                dueDate: \"2024-04-01\",\n                completed: false,\n                assignee: \"Sarah Miller\",\n                type: \"task\",\n                startDate: \"2024-03-28\"\n            }\n        ]\n    },\n    {\n        id: 2,\n        name: \"Handlingsplan: Dialog\",\n        type: \"OSA handlingsplan\",\n        status: \"In progress\",\n        progress: 20,\n        description: \"Action plan following the annual work environment survey\",\n        stakeholders: [\n            {\n                name: \"Sarah Miller\",\n                role: \"HR Manager\",\n                image: \"https://i.pravatar.cc/150?u=2\"\n            }\n        ],\n        createdAt: \"2024-03-10T14:30:00\",\n        tasks: [\n            {\n                id: 1,\n                title: \"Review survey results\",\n                description: \"Analyze feedback and identify key areas for improvement\",\n                dueDate: \"2024-03-20\",\n                completed: true,\n                assignee: \"Sarah Miller\",\n                type: \"task\",\n                startDate: \"2024-03-16\"\n            },\n            {\n                id: 2,\n                title: \"Schedule team meeting\",\n                description: \"Discuss findings with the team\",\n                dueDate: \"2024-03-25\",\n                completed: false,\n                assignee: \"Sarah Miller\",\n                type: \"task\",\n                startDate: \"2024-03-22\"\n            }\n        ]\n    }\n];\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9kYXRhL2FjdGl2aXRpZXMudHMiLCJtYXBwaW5ncyI6Ijs7OztBQTZDVyxNQUFNQSxhQUErQjtJQUMxQztRQUNFQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFVBQVU7UUFDVkMsYUFBYTtRQUNiQyxjQUFjO1lBQ1o7Z0JBQUVMLE1BQU07Z0JBQWNNLE1BQU07Z0JBQWNDLE9BQU87WUFBZ0M7WUFDakY7Z0JBQUVQLE1BQU07Z0JBQWdCTSxNQUFNO2dCQUFhQyxPQUFPO1lBQWdDO1NBQ25GO1FBQ0RDLFlBQVk7UUFDWkMsU0FBUztRQUNUQyxXQUFXO1FBQ1hDLE9BQU87WUFDTDtnQkFDRVosSUFBSTtnQkFDSmEsT0FBTztnQkFDUEMsU0FBUztnQkFDVEMsV0FBVztnQkFDWEMsVUFBVTtnQkFDVmQsTUFBTTtnQkFDTmUsV0FBVztnQkFDWEMsU0FBUztnQkFDVEMsVUFBVTtZQUNaO1lBQ0E7Z0JBQ0VuQixJQUFJO2dCQUNKYSxPQUFPO2dCQUNQUixhQUFhO2dCQUNiSyxTQUFTO2dCQUNUSyxXQUFXO2dCQUNYQyxVQUFVO2dCQUNWZCxNQUFNO2dCQUNOa0IsV0FBVztZQUNiO1lBQ0E7Z0JBQ0VwQixJQUFJO2dCQUNKYSxPQUFPO2dCQUNQUixhQUFhO2dCQUNiSyxTQUFTO2dCQUNUSyxXQUFXO2dCQUNYQyxVQUFVO2dCQUNWZCxNQUFNO2dCQUNOa0IsV0FBVztZQUNiO1NBQ0Q7SUFDSDtJQUNBO1FBQ0VwQixJQUFJO1FBQ0pDLE1BQU07UUFDTkMsTUFBTTtRQUNOQyxRQUFRO1FBQ1JDLFVBQVU7UUFDVkMsYUFBYTtRQUNiQyxjQUFjO1lBQ1o7Z0JBQUVMLE1BQU07Z0JBQWdCTSxNQUFNO2dCQUFjQyxPQUFPO1lBQWdDO1NBQ3BGO1FBQ0RHLFdBQVc7UUFDWEMsT0FBTztZQUNMO2dCQUNFWixJQUFJO2dCQUNKYSxPQUFPO2dCQUNQUixhQUFhO2dCQUNiSyxTQUFTO2dCQUNUSyxXQUFXO2dCQUNYQyxVQUFVO2dCQUNWZCxNQUFNO2dCQUNOa0IsV0FBVztZQUNiO1lBQ0E7Z0JBQ0VwQixJQUFJO2dCQUNKYSxPQUFPO2dCQUNQUixhQUFhO2dCQUNiSyxTQUFTO2dCQUNUSyxXQUFXO2dCQUNYQyxVQUFVO2dCQUNWZCxNQUFNO2dCQUNOa0IsV0FBVztZQUNiO1NBQ0Q7SUFDSDtDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL2RhdGEvYWN0aXZpdGllcy50cz83ZjQ1Il0sInNvdXJjZXNDb250ZW50IjpbIiAgICBpbXBvcnQgeyBjdXN0b21Xb3JrZmxvd3MgfSBmcm9tICcuL3dvcmtmbG93cyc7XG5cbiAgICBleHBvcnQgdHlwZSBBY3Rpdml0eVN0YXR1cyA9ICdJbiBwcm9ncmVzcycgfCAnUGxhbm5pbmcnIHwgJ0NvbXBsZXRlZCc7XG5cblxuICAgIGV4cG9ydCB0eXBlIFRhc2sgPSB7XG4gICAgICBpZDogbnVtYmVyO1xuICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICBkdWVEYXRlOiBzdHJpbmc7XG4gICAgICBzdGFydERhdGU6IHN0cmluZ1xuICAgICAgY29tcGxldGVkOiBib29sZWFuO1xuICAgICAgYXNzaWduZWU6IHN0cmluZztcbiAgICAgIHR5cGU6ICd0YXNrJztcbiAgICB9XG5cbiAgICBleHBvcnQgdHlwZSBFbWFpbFRhc2sgPSB7XG4gICAgICAgIGlkOiBudW1iZXI7XG4gICAgICAgIHRpdGxlOiAnU2VuZCBhbiBhdXRvbWF0ZWQgRW1haWwnO1xuICAgICAgICByZWNpcGllbnQ6IHN0cmluZztcbiAgICAgICAgY29udGVudDogc3RyaW5nO1xuICAgICAgICBzZW5kRGF0ZTogc3RyaW5nO1xuICAgICAgICBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgICAgIGFzc2lnbmVlOiBzdHJpbmc7XG4gICAgICAgIHR5cGU6ICdlbWFpbCc7XG4gICAgfVxuXG4gICAgZXhwb3J0IHR5cGUgQWN0aXZpdHlEZXRhaWwgPSB7XG4gICAgICBpZDogbnVtYmVyO1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdHlwZTogc3RyaW5nO1xuICAgICAgc3RhdHVzOiBBY3Rpdml0eVN0YXR1cztcbiAgICAgIHByb2dyZXNzOiBudW1iZXI7XG4gICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgc3Rha2Vob2xkZXJzOiB7XG4gICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgcm9sZTogc3RyaW5nO1xuICAgICAgICBpbWFnZTogc3RyaW5nO1xuICAgICAgfVtdO1xuICAgICAgd29ya2Zsb3dJZD86IG51bWJlcjtcbiAgICAgIGR1ZURhdGU/OiBzdHJpbmc7XG4gICAgICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgICAgIHRhc2tzOiAoVGFzayB8IEVtYWlsVGFzaylbXTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGFjdGl2aXRpZXM6IEFjdGl2aXR5RGV0YWlsW10gPSBbXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBuYW1lOiBcIk9uYm9hcmRpbmc6IEthcmwgS2FybHNzb25cIixcbiAgICAgICAgdHlwZTogXCJXb3JrZmxvd1wiLFxuICAgICAgICBzdGF0dXM6IFwiSW4gcHJvZ3Jlc3NcIixcbiAgICAgICAgcHJvZ3Jlc3M6IDI1LFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJOZXcgZW1wbG95ZWUgb25ib2FyZGluZyBwcm9jZXNzIGZvciBLYXJsIEthcmxzc29uLCBzdGFydGluZyBBcHJpbCAxc3QsIDIwMjRcIixcbiAgICAgICAgc3Rha2Vob2xkZXJzOiBbXG4gICAgICAgICAgeyBuYW1lOiBcIkpvaG4gRGF2aXNcIiwgcm9sZTogXCJIUiBNYW5hZ2VyXCIsIGltYWdlOiBcImh0dHBzOi8vaS5wcmF2YXRhci5jYy8xNTA/dT0xXCIgfSxcbiAgICAgICAgICB7IG5hbWU6IFwiU2FyYWggTWlsbGVyXCIsIHJvbGU6IFwiVGVhbSBMZWFkXCIsIGltYWdlOiBcImh0dHBzOi8vaS5wcmF2YXRhci5jYy8xNTA/dT0yXCIgfVxuICAgICAgICBdLFxuICAgICAgICB3b3JrZmxvd0lkOiAxLFxuICAgICAgICBkdWVEYXRlOiBcIjIwMjQtMDQtMDFcIixcbiAgICAgICAgY3JlYXRlZEF0OiBcIjIwMjQtMDMtMTVUMDk6MDA6MDBcIixcbiAgICAgICAgdGFza3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIHRpdGxlOiBcIlNlbmQgYXV0b21hdGVkIGVtYWlsXCIsXG4gICAgICAgICAgICBzdWJqZWN0OiBcIldlbGNvbWUgdG8gdGhlIHRlYW0g8J+OiVwiLFxuICAgICAgICAgICAgY29tcGxldGVkOiB0cnVlLFxuICAgICAgICAgICAgYXNzaWduZWU6IFwiU3lzdGVtXCIsXG4gICAgICAgICAgICB0eXBlOiBcImVtYWlsXCIsXG4gICAgICAgICAgICByZWNpcGllbnQ6ICdrYXJsLmthcmxzc29uQGV4YW1wbGUuY29tJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdXZWxjb21lIHRvIHRoZSB0ZWFtIEthcmwhJyxcbiAgICAgICAgICAgIHNlbmREYXRlOiAnMjAyNC0wMy0yNFQxMjowMDowMCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgdGl0bGU6IFwiUHJlcGFyZSB3b3Jrc3RhdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU2V0IHVwIGNvbXB1dGVyLCBhY2Nlc3MgY2FyZHMsIGFuZCByZXF1aXJlZCBzb2Z0d2FyZVwiLFxuICAgICAgICAgICAgZHVlRGF0ZTogXCIyMDI0LTAzLTMwXCIsXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYXNzaWduZWU6IFwiSVQgU3VwcG9ydFwiLFxuICAgICAgICAgICAgdHlwZTogXCJ0YXNrXCIsXG4gICAgICAgICAgICBzdGFydERhdGU6ICcyMDI0LTAzLTI2J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICB0aXRsZTogXCJTY2hlZHVsZSBvcmllbnRhdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQm9vayBpbnRyb2R1Y3Rpb24gbWVldGluZ3Mgd2l0aCBrZXkgdGVhbSBtZW1iZXJzXCIsXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjIwMjQtMDQtMDFcIixcbiAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICBhc3NpZ25lZTogXCJTYXJhaCBNaWxsZXJcIixcbiAgICAgICAgICAgIHR5cGU6IFwidGFza1wiLFxuICAgICAgICAgICAgc3RhcnREYXRlOiAnMjAyNC0wMy0yOCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAyLFxuICAgICAgICBuYW1lOiBcIkhhbmRsaW5nc3BsYW46IERpYWxvZ1wiLFxuICAgICAgICB0eXBlOiBcIk9TQSBoYW5kbGluZ3NwbGFuXCIsXG4gICAgICAgIHN0YXR1czogXCJJbiBwcm9ncmVzc1wiLFxuICAgICAgICBwcm9ncmVzczogMjAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkFjdGlvbiBwbGFuIGZvbGxvd2luZyB0aGUgYW5udWFsIHdvcmsgZW52aXJvbm1lbnQgc3VydmV5XCIsXG4gICAgICAgIHN0YWtlaG9sZGVyczogW1xuICAgICAgICAgIHsgbmFtZTogXCJTYXJhaCBNaWxsZXJcIiwgcm9sZTogXCJIUiBNYW5hZ2VyXCIsIGltYWdlOiBcImh0dHBzOi8vaS5wcmF2YXRhci5jYy8xNTA/dT0yXCIgfVxuICAgICAgICBdLFxuICAgICAgICBjcmVhdGVkQXQ6IFwiMjAyNC0wMy0xMFQxNDozMDowMFwiLFxuICAgICAgICB0YXNrczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGl0bGU6IFwiUmV2aWV3IHN1cnZleSByZXN1bHRzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBbmFseXplIGZlZWRiYWNrIGFuZCBpZGVudGlmeSBrZXkgYXJlYXMgZm9yIGltcHJvdmVtZW50XCIsXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjIwMjQtMDMtMjBcIixcbiAgICAgICAgICAgIGNvbXBsZXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGFzc2lnbmVlOiBcIlNhcmFoIE1pbGxlclwiLFxuICAgICAgICAgICAgdHlwZTogXCJ0YXNrXCIsXG4gICAgICAgICAgICBzdGFydERhdGU6ICcyMDI0LTAzLTE2J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICB0aXRsZTogXCJTY2hlZHVsZSB0ZWFtIG1lZXRpbmdcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRpc2N1c3MgZmluZGluZ3Mgd2l0aCB0aGUgdGVhbVwiLFxuICAgICAgICAgICAgZHVlRGF0ZTogXCIyMDI0LTAzLTI1XCIsXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYXNzaWduZWU6IFwiU2FyYWggTWlsbGVyXCIsXG4gICAgICAgICAgICB0eXBlOiBcInRhc2tcIixcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogJzIwMjQtMDMtMjInXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXTtcbiJdLCJuYW1lcyI6WyJhY3Rpdml0aWVzIiwiaWQiLCJuYW1lIiwidHlwZSIsInN0YXR1cyIsInByb2dyZXNzIiwiZGVzY3JpcHRpb24iLCJzdGFrZWhvbGRlcnMiLCJyb2xlIiwiaW1hZ2UiLCJ3b3JrZmxvd0lkIiwiZHVlRGF0ZSIsImNyZWF0ZWRBdCIsInRhc2tzIiwidGl0bGUiLCJzdWJqZWN0IiwiY29tcGxldGVkIiwiYXNzaWduZWUiLCJyZWNpcGllbnQiLCJjb250ZW50Iiwic2VuZERhdGUiLCJzdGFydERhdGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/data/activities.ts\n"));

/***/ })

});