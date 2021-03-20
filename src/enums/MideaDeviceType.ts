export enum MideaDeviceType {
    Plug = 0x10,
    RemoteController = 0x11,
    AirBox = 0x12,
    Light = 0x13,
    Curtain = 0x14,
    MBox = 0x1B,

    Dehumidifier = 0xA1,
    AirConditioner = 0xAC,

    MicroWaveOven = 0xB0,
    BigOven = 0xB1,
    SteamerOven = 0xB2,
    Sterilizer = 0xB3,
    Toaster = 0xB4,
    Hood = 0xB6,
    Hob = 0xB7,
    VacuumCleaner = 0xB8,
    Induction = 0xB9,

    Refrigerator = 0xCA,
    MDV = 0xCC,
    AirWaterHeater = 0xCD,

    PulsatorWasher = 0xDA,
    DurmWasher = 0xDB,
    ClothesDryer = 0xDC,

    DishWasher = 0xE1,
    ElectricWaterHeater = 0xE2,
    GasWaterHeater = 0xE3,
    RiceCooker = 0xEA,
    InductionCooker = 0xEB,
    PressureCooker = 0xEC,
    WaterPurifier = 0xED,
    SoybeanMachine = 0xEF,

    ElectricFanner = 0xFA,
    ElectricHeater = 0xFB,
    AirPurifier = 0xFC,
    Humidifier = 0xFD,
    AirConditionFanner = 0xFE,

    AllType = 0xFF
}