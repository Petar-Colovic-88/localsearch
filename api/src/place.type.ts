export type Place = {
  local_entry_id: string;
  displayed_what: string;
  displayed_where: string;
  opening_hours: OpeningHours;
};

export type OpeningHours = {
  days: Days;
};

export type Days = {
  [day in keyof typeof defaultDays]: {
    start: string;
    end: string;
  }[];
};

export const defaultHour = 'Closed';

export const defaultDays = {
  monday: defaultHour,
  tuesday: defaultHour,
  wednesday: defaultHour,
  thursday: defaultHour,
  friday: defaultHour,
  saturday: defaultHour,
  sunday: defaultHour,
};
