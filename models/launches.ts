import { 
  log,  
  _ 
} from "../deps.ts";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: string[];
  launchDate: number;
  upcoming: boolean;
  success?: boolean;
  target?: string;
}
const launches = new Map<number, Launch>();

export async function downloadLaunchData() {
  log.info('downloading launch data...')
  const response = await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET',
  });

  if (!response.ok) {
    log.warning('Problem downloading launch data');
    throw new Error('launch data download failed');
  }

  const launchData = await response.json();
  for (const launch of launchData) {
    const payloads = launch['rocket']['second_stage']['payloads'];
    const customers = _.flatMap(payloads, (payload: any) => {
      return payload['customers'];
    })
    const flightData = {
      flightNumber: launch['flight_number'],
      mission: launch['mission_name'],
      rocket: launch['rocket']['rocket_name'],
      customers,
      launchDate: launch['launch_date_unix'],
      upcoming: launch['upcoming'],
      success: launch['launch_success'],
    };
    launches.set(flightData.flightNumber, flightData)
  }
}

await downloadLaunchData();
log.info(`Downloaded data for ${launches.size} Spacex launches`)

export function getAllLaunches() {
  return Array.from(launches.values())
}

export function getOneLaunch(id: number) {
  if (launches.has(id)) {
    return launches.get(id)
  }
  return null
}

export function addOneLaunch(data: Launch) {
  launches.set(data.flightNumber, Object.assign(data, {
    upcoming: true,
    customers: ['Krzyś', 'NASA']
  }));
}

export function deleteOneLaunch(id: number) {
  const aborted = launches.get(id)
  if (aborted) {
    aborted.success = false
    aborted.upcoming = false
  }
  return aborted;
}