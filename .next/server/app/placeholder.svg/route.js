/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/placeholder.svg/route";
exports.ids = ["app/placeholder.svg/route"];
exports.modules = {

/***/ "(rsc)/./app/placeholder.svg/route.ts":
/*!**************************************!*\
  !*** ./app/placeholder.svg/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    // Get parameters from the URL\n    const width = Number.parseInt(searchParams.get(\"width\") || \"300\", 10);\n    const height = Number.parseInt(searchParams.get(\"height\") || \"300\", 10);\n    const text = searchParams.get(\"text\") || \"\";\n    // Generate a random background color if not specified\n    const bgColor = searchParams.get(\"bgColor\") || getRandomPastelColor();\n    const textColor = searchParams.get(\"textColor\") || \"#000000\";\n    // Create the SVG\n    const svg = `\n    <svg width=\"${width}\" height=\"${height}\" viewBox=\"0 0 ${width} ${height}\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect width=\"${width}\" height=\"${height}\" fill=\"${bgColor}\" />\n      <text \n        x=\"50%\" \n        y=\"50%\" \n        font-family=\"system-ui, sans-serif\" \n        font-size=\"${Math.max(12, Math.min(width, height) / 10)}px\" \n        fill=\"${textColor}\" \n        text-anchor=\"middle\" \n        dominant-baseline=\"middle\"\n      >\n        ${escapeHtml(text)}\n      </text>\n    </svg>\n  `;\n    // Return the SVG with appropriate headers\n    return new Response(svg, {\n        headers: {\n            \"Content-Type\": \"image/svg+xml\",\n            \"Cache-Control\": \"public, max-age=31536000, immutable\"\n        }\n    });\n}\n// Helper function to generate a random pastel color\nfunction getRandomPastelColor() {\n    const hue = Math.floor(Math.random() * 360);\n    return `hsl(${hue}, 70%, 80%)`;\n}\n// Helper function to escape HTML special characters\nfunction escapeHtml(unsafe) {\n    return unsafe.replace(/&/g, \"&amp;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\").replace(/\"/g, \"&quot;\").replace(/'/g, \"&#039;\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvcGxhY2Vob2xkZXIuc3ZnL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFFTyxlQUFlQSxJQUFJQyxPQUFvQjtJQUM1QyxNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7SUFFNUMsOEJBQThCO0lBQzlCLE1BQU1DLFFBQVFDLE9BQU9DLFFBQVEsQ0FBQ0wsYUFBYU0sR0FBRyxDQUFDLFlBQVksT0FBTztJQUNsRSxNQUFNQyxTQUFTSCxPQUFPQyxRQUFRLENBQUNMLGFBQWFNLEdBQUcsQ0FBQyxhQUFhLE9BQU87SUFDcEUsTUFBTUUsT0FBT1IsYUFBYU0sR0FBRyxDQUFDLFdBQVc7SUFFekMsc0RBQXNEO0lBQ3RELE1BQU1HLFVBQVVULGFBQWFNLEdBQUcsQ0FBQyxjQUFjSTtJQUMvQyxNQUFNQyxZQUFZWCxhQUFhTSxHQUFHLENBQUMsZ0JBQWdCO0lBRW5ELGlCQUFpQjtJQUNqQixNQUFNTSxNQUFNLENBQUM7Z0JBQ0MsRUFBRVQsTUFBTSxVQUFVLEVBQUVJLE9BQU8sZUFBZSxFQUFFSixNQUFNLENBQUMsRUFBRUksT0FBTzttQkFDekQsRUFBRUosTUFBTSxVQUFVLEVBQUVJLE9BQU8sUUFBUSxFQUFFRSxRQUFROzs7OzttQkFLN0MsRUFBRUksS0FBS0MsR0FBRyxDQUFDLElBQUlELEtBQUtFLEdBQUcsQ0FBQ1osT0FBT0ksVUFBVSxJQUFJO2NBQ2xELEVBQUVJLFVBQVU7Ozs7UUFJbEIsRUFBRUssV0FBV1IsTUFBTTs7O0VBR3pCLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsT0FBTyxJQUFJUyxTQUFTTCxLQUFLO1FBQ3ZCTSxTQUFTO1lBQ1AsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtRQUNuQjtJQUNGO0FBQ0Y7QUFFQSxvREFBb0Q7QUFDcEQsU0FBU1I7SUFDUCxNQUFNUyxNQUFNTixLQUFLTyxLQUFLLENBQUNQLEtBQUtRLE1BQU0sS0FBSztJQUN2QyxPQUFPLENBQUMsSUFBSSxFQUFFRixJQUFJLFdBQVcsQ0FBQztBQUNoQztBQUVBLG9EQUFvRDtBQUNwRCxTQUFTSCxXQUFXTSxNQUFjO0lBQ2hDLE9BQU9BLE9BQ0pDLE9BQU8sQ0FBQyxNQUFNLFNBQ2RBLE9BQU8sQ0FBQyxNQUFNLFFBQ2RBLE9BQU8sQ0FBQyxNQUFNLFFBQ2RBLE9BQU8sQ0FBQyxNQUFNLFVBQ2RBLE9BQU8sQ0FBQyxNQUFNO0FBQ25CIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXERFTExcXERvY3VtZW50c1xcaG9yZWItbWFya2V0XFxhcHBcXHBsYWNlaG9sZGVyLnN2Z1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXHJcblxyXG4gIC8vIEdldCBwYXJhbWV0ZXJzIGZyb20gdGhlIFVSTFxyXG4gIGNvbnN0IHdpZHRoID0gTnVtYmVyLnBhcnNlSW50KHNlYXJjaFBhcmFtcy5nZXQoXCJ3aWR0aFwiKSB8fCBcIjMwMFwiLCAxMClcclxuICBjb25zdCBoZWlnaHQgPSBOdW1iZXIucGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldChcImhlaWdodFwiKSB8fCBcIjMwMFwiLCAxMClcclxuICBjb25zdCB0ZXh0ID0gc2VhcmNoUGFyYW1zLmdldChcInRleHRcIikgfHwgXCJcIlxyXG5cclxuICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBiYWNrZ3JvdW5kIGNvbG9yIGlmIG5vdCBzcGVjaWZpZWRcclxuICBjb25zdCBiZ0NvbG9yID0gc2VhcmNoUGFyYW1zLmdldChcImJnQ29sb3JcIikgfHwgZ2V0UmFuZG9tUGFzdGVsQ29sb3IoKVxyXG4gIGNvbnN0IHRleHRDb2xvciA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ0ZXh0Q29sb3JcIikgfHwgXCIjMDAwMDAwXCJcclxuXHJcbiAgLy8gQ3JlYXRlIHRoZSBTVkdcclxuICBjb25zdCBzdmcgPSBgXHJcbiAgICA8c3ZnIHdpZHRoPVwiJHt3aWR0aH1cIiBoZWlnaHQ9XCIke2hlaWdodH1cIiB2aWV3Qm94PVwiMCAwICR7d2lkdGh9ICR7aGVpZ2h0fVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgPHJlY3Qgd2lkdGg9XCIke3dpZHRofVwiIGhlaWdodD1cIiR7aGVpZ2h0fVwiIGZpbGw9XCIke2JnQ29sb3J9XCIgLz5cclxuICAgICAgPHRleHQgXHJcbiAgICAgICAgeD1cIjUwJVwiIFxyXG4gICAgICAgIHk9XCI1MCVcIiBcclxuICAgICAgICBmb250LWZhbWlseT1cInN5c3RlbS11aSwgc2Fucy1zZXJpZlwiIFxyXG4gICAgICAgIGZvbnQtc2l6ZT1cIiR7TWF0aC5tYXgoMTIsIE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMTApfXB4XCIgXHJcbiAgICAgICAgZmlsbD1cIiR7dGV4dENvbG9yfVwiIFxyXG4gICAgICAgIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgXHJcbiAgICAgICAgZG9taW5hbnQtYmFzZWxpbmU9XCJtaWRkbGVcIlxyXG4gICAgICA+XHJcbiAgICAgICAgJHtlc2NhcGVIdG1sKHRleHQpfVxyXG4gICAgICA8L3RleHQ+XHJcbiAgICA8L3N2Zz5cclxuICBgXHJcblxyXG4gIC8vIFJldHVybiB0aGUgU1ZHIHdpdGggYXBwcm9wcmlhdGUgaGVhZGVyc1xyXG4gIHJldHVybiBuZXcgUmVzcG9uc2Uoc3ZnLCB7XHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiaW1hZ2Uvc3ZnK3htbFwiLFxyXG4gICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZVwiLFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcblxyXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSByYW5kb20gcGFzdGVsIGNvbG9yXHJcbmZ1bmN0aW9uIGdldFJhbmRvbVBhc3RlbENvbG9yKCkge1xyXG4gIGNvbnN0IGh1ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDM2MClcclxuICByZXR1cm4gYGhzbCgke2h1ZX0sIDcwJSwgODAlKWBcclxufVxyXG5cclxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGVzY2FwZSBIVE1MIHNwZWNpYWwgY2hhcmFjdGVyc1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHVuc2FmZVxyXG4gICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4gICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXHJcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4gICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIilcclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJ3aWR0aCIsIk51bWJlciIsInBhcnNlSW50IiwiZ2V0IiwiaGVpZ2h0IiwidGV4dCIsImJnQ29sb3IiLCJnZXRSYW5kb21QYXN0ZWxDb2xvciIsInRleHRDb2xvciIsInN2ZyIsIk1hdGgiLCJtYXgiLCJtaW4iLCJlc2NhcGVIdG1sIiwiUmVzcG9uc2UiLCJoZWFkZXJzIiwiaHVlIiwiZmxvb3IiLCJyYW5kb20iLCJ1bnNhZmUiLCJyZXBsYWNlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/placeholder.svg/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fplaceholder.svg%2Froute&page=%2Fplaceholder.svg%2Froute&appPaths=&pagePath=private-next-app-dir%2Fplaceholder.svg%2Froute.ts&appDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fplaceholder.svg%2Froute&page=%2Fplaceholder.svg%2Froute&appPaths=&pagePath=private-next-app-dir%2Fplaceholder.svg%2Froute.ts&appDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_DELL_Documents_horeb_market_app_placeholder_svg_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/placeholder.svg/route.ts */ \"(rsc)/./app/placeholder.svg/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/placeholder.svg/route\",\n        pathname: \"/placeholder.svg\",\n        filename: \"route\",\n        bundlePath: \"app/placeholder.svg/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\DELL\\\\Documents\\\\horeb-market\\\\app\\\\placeholder.svg\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_DELL_Documents_horeb_market_app_placeholder_svg_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZwbGFjZWhvbGRlci5zdmclMkZyb3V0ZSZwYWdlPSUyRnBsYWNlaG9sZGVyLnN2ZyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRnBsYWNlaG9sZGVyLnN2ZyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNERUxMJTVDRG9jdW1lbnRzJTVDaG9yZWItbWFya2V0JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNERUxMJTVDRG9jdW1lbnRzJTVDaG9yZWItbWFya2V0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN3QjtBQUNyRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcREVMTFxcXFxEb2N1bWVudHNcXFxcaG9yZWItbWFya2V0XFxcXGFwcFxcXFxwbGFjZWhvbGRlci5zdmdcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvcGxhY2Vob2xkZXIuc3ZnL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9wbGFjZWhvbGRlci5zdmdcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvcGxhY2Vob2xkZXIuc3ZnL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcREVMTFxcXFxEb2N1bWVudHNcXFxcaG9yZWItbWFya2V0XFxcXGFwcFxcXFxwbGFjZWhvbGRlci5zdmdcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fplaceholder.svg%2Froute&page=%2Fplaceholder.svg%2Froute&appPaths=&pagePath=private-next-app-dir%2Fplaceholder.svg%2Froute.ts&appDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fplaceholder.svg%2Froute&page=%2Fplaceholder.svg%2Froute&appPaths=&pagePath=private-next-app-dir%2Fplaceholder.svg%2Froute.ts&appDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDELL%5CDocuments%5Choreb-market&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();