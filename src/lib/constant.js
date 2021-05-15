export const Constants = {
  BASE_URL: 'https://api-public.navace.com.au/v1/',

  NAVACE_VERSION: 'Navace v1.1',

  SELECTION_TYPES: {
    ASSET: 'asset',
    SITE: 'site',
  },

  STATUS: {
    COMPLETE: 0,
    PENDING: 1,
  },

  DASHBOARD_NAV: {
    1: 'NavCheck',
    2: 'NavMaint',
    3: 'NavSafe',
    4: 'NavFuel',
  },

  CHECKSHEET_ITEM_STATUS: {
    OK: 1,
    Adjusted: 2,
    Replaced: 3,
    RepairRequired: 4,
    Environmental: 5,
    Safety: 6,
    PreviouslyReported: 7,
  },

  WEEKLY_BUTTONS: {
    OK: 0,
    FAULTY: 1,
  },

  SCHEDULE_TYPES: {
    KMS: 1,
    MONTHS: 2,
    HOURS: 3,
  },
};
