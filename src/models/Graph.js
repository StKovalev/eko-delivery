import find from 'lodash/find'
import pull from 'lodash/pull'
import min from 'lodash/min'

export class Graph {
  constructor(nodes) {
    this.nodes = nodes;
    this.vertexes = [];
    nodes.map(node => {
        if (this.vertexes.indexOf(node.start) == -1)
          this.vertexes.push(node.start)
        if (this.vertexes.indexOf(node.end) == -1) this.vertexes.push(node.end)
      });
  }

  dijkstra(source, goal) {
    const dist = {}
    const prev = {}
    let queue = []

    this.vertexes.map(vertex => {
      dist[vertex] = Infinity
      prev[vertex] = null
      queue.push(vertex)
    })

    dist[source] = 0

    while (queue.length > 0) {
      let tempVal = Infinity
      let vertex = null
      for (let index = 0; index < queue.length; index++) {
        if (dist[queue[index]] < tempVal) {
          vertex = queue[index]
          tempVal = dist[queue[index]]
        }
      }
      if (vertex === goal) {
        break
      }
      queue = pull(queue, vertex)
      this.nodes.filter(node => node.start === vertex).map(node => {
        const alt = dist[vertex] + node.weight
        if (alt < dist[node.end]) {
          dist[node.end] = alt
          prev[node.end] = vertex
        }
      })
    }
    return dist[goal]
  }

  findBestPath(route) {
    const beginning = route.charAt(0);
    const end = route.charAt(1);
    return min(
      this.nodes
        .filter(node => node.start === beginning)
        .map(node => node.weight + this.dijkstra(node.end, end))
    )
  }

  weightOfPathFromString(str) {
    const weight = this.weightOfPath(str.split(''));
    return (weight === -1) ? 'NO SUCH ROUTE' : `The cost of route ${str} is ${weight} dollars`
  }

  weightOfPath(map) {
    let distance = 0
    for (let index = 0; index < map.length - 1; index++) {
      const start = map[index]
      const end = map[index + 1]
      const way = find(
        this.nodes,
        node => node.start === start && node.end === end
      )
      if (!way) {
        distance = -1
        break
      } else {
        distance += way.weight
      }
    }
    return distance
  }

  countTrips(trip, location, goal, ceiling, comparator) {
    const soFar = [...trip, location]
    if (comparator(trip, ceiling) && location === goal) {
      return 1
    } else if (trip.length >= ceiling) {
      return 0
    } else {
      return [...this.nodes]
        .filter(node => node.start === location)
        .reduce(
          (sum, node) =>
            sum + this.countTrips(soFar, node.end, goal, ceiling, comparator),
          0
        )
    }
  }

  countTripsWithLessThanNStops(route, stops) {
    const source = route.charAt(0);
    const goal = route.charAt(1);
    return this.countTrips(
      [],
      source,
      goal,
      stops + 1,
      (trip, ceiling) => trip.length < ceiling && trip.length > 1
    )
  }
}