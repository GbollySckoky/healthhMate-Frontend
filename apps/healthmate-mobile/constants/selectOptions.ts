interface SelectOption {
  value: string
  label: string
}


export const SUGAR_TIMING_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select timing' },
  { value: 'FASTING', label: 'FASTING' },
  { value: 'BEFORE_MEAL', label: 'BEFORE MEAL' },
  { value: 'AFTER_MEAL', label: 'AFTER MEAL' },
  { value: 'RANDOM', label: 'RANDOM' },
  { value: 'BEDTIME', label: 'BEDTIME' },
]

export const MEAL_TYPE_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select meal type' },
  { value: 'BREAKFAST', label: 'BREAKFAST' },
  { value: 'LUNCH', label: 'LUNCH' },
  { value: 'DINNER', label: 'DINNER' },
  { value: 'SNACK', label: 'SNACK' },
]

export const UNIT_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select unit' },
  { value: 'MMOL_L', label: 'mmol/L' },
  { value: 'MG_DL', label: 'mg/dL' },
]

export const SELECT_CLASS =
  'border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-1  w-full text-sm'
