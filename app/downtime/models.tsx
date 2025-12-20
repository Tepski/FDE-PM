interface DowntimeModel {
  id: number,
  machine: string,
  date: Date,
  abnormality: string,
  action: string,
  type: string,
  shift: string,
  start: string,
  end: string,
  duration: number,
  actionBy: string,
}

export default DowntimeModel
