
// export async function getRoutes(setRoutes, setRouteList) {
//   const displayRoutes = (routes) => {
//     const routNames = routes.map(route => route.route_label);
//     setRouteList(routNames)
//     return routNames;
//   }
//   const routes = await fetch("https://svc.metrotransit.org/nextripv2/routes");
//   const routesData = await routes.json()
//   await displayRoutes(routesData)
//   setRoutes(routesData)
// }

  // export const displayDirections = (directions, setDirectionList, setSelectedDirection) => {
  //   const directionNames = directions.map(direction => direction.direction_name);
  //   setDirectionList(directionNames)
  //   setSelectedDirection(directionNames[0], [])
  //   return directionNames;
  // }