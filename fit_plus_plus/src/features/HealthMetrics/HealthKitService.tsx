import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
  HealthInputOptions,
  HealthKitInitOptions,
} from 'react-native-health';

class HealthKitService {
  private static instance: HealthKitService;

  private constructor() {}

  public static getInstance(): HealthKitService {
    if (!HealthKitService.instance) {
      HealthKitService.instance = new HealthKitService();
    }
    return HealthKitService.instance;
  }

  public initHealthKit(): Promise<void> {
    const permissions: HealthKitPermissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
          AppleHealthKit.Constants.Permissions.BiologicalSex,
          AppleHealthKit.Constants.Permissions.DateOfBirth,
          AppleHealthKit.Constants.Permissions.Weight,
          AppleHealthKit.Constants.Permissions.Height,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
          AppleHealthKit.Constants.Permissions.Workout
        ],
        write: [],
      },
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        if (error) {
          console.error('Error initializing HealthKit:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public getStepCount(startDate: Date, endDate: Date): Promise<HealthValue> {
    const options: HealthInputOptions = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
        if (err) {
          console.error('Error getting step count:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default HealthKitService.getInstance();
