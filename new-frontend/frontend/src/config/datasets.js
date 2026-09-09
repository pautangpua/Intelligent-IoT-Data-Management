export const LIVE_DATASETS = {
  "12397": {
    channelId: "12397",
    datasetName:
      import.meta.env.VITE_THINGSPEAK_12397_DATASET || "thingspeak-live",
    name: "ThingSpeak Pressure Channel",
    description: "Live atmospheric pressure readings from ThingSpeak channel 12397.",
    unitHints: { field1: "inHg", pressure: "inHg" },
  },
  "1350261": {
    channelId: "1350261",
    datasetName:
      import.meta.env.VITE_THINGSPEAK_1350261_DATASET || "thingspeak-1350261",
    name: "ThingSpeak Multi-Sensor Channel",
    description: "Live multi-stream readings from ThingSpeak channel 1350261.",
    unitHints: {},
  },
};

export const getLiveDataset = (id) => LIVE_DATASETS[String(id)] || null;
