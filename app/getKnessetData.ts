interface ScheduleDataProps {
  SelectedDate: string;
  SelectedMonth: string | null;
  SelectedYear: string | null;
}

interface ScheduleEvent {
  EventStart: string;
  StartDate: string; //change to time format
  StartTime: string; // change to time format
  EventType: ScheduleEventType;
  EventName: string;
  committee_rank: number;
}

export enum ScheduleEventType {
  Plenum = 1,
  Committee,
  SpecialOccasion,
}

export interface ScheduleData {
  CommiteesNumber?: number;
  Events: ScheduleEvent[];
}

export async function getScheduleData(
  props: ScheduleDataProps
): Promise<ScheduleData> {
  // Make the HTTP POST request to the API

  const responseJson = await fetchData(
    "https://knesset.gov.il/WebSiteApi/knessetapi/KnessetMainEvents/GetEventsToday",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    }
  );
  // parse the events from the json data
  const events: ScheduleEvent[] = responseJson.CurrentEvents.map(
    (event: any) => {
      // remove html tags and time from the event name
      const cleanName: string = event.EventName.replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\d{2}:\d{2}/, "")
        .trim();
      return {
        EventStart: event.EventStart,
        StartDate: event.StartDate,
        StartTime: event.StartTime,
        EventType: event.EventType,
        EventName: cleanName,
        committee_rank: event.committee_rank,
      };
    }
  );
  //count the number of committees
  const commiteesNumber = events.filter(
    (event) => event.EventType === ScheduleEventType.Committee
  ).length;
  const Comittees = events.filter(
    (event) => event.EventType === ScheduleEventType.Committee
  );
  const Plenum = events.filter(
    (event) => event.EventType === ScheduleEventType.Plenum
  );
  const SpecialOccasions = events.filter(
    (event) => event.EventType === ScheduleEventType.SpecialOccasion
  );
  return {
    Events: [...Comittees, ...Plenum, ...SpecialOccasions],
    CommiteesNumber: commiteesNumber,
  };
}

/*
global fetching function for all fetch requests
*/
export async function fetchData(
  url: string,
  requestInit: RequestInit
): Promise<any> {
  const response = await fetch(url, requestInit);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return await response.json();
}