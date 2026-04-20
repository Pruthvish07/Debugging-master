export interface ErrorTopic {
  code: string;
  title: string;
  category: 'Network' | 'Logic' | 'Deployment' | 'Hardware';
  description: string;
  solution: string;
}

export const errorDatabase: ErrorTopic[] = [
  // Hardware
  {
    code: "HW_001",
    title: "I2C Communication Failed",
    category: "Hardware",
    description: "MPU6050 or other I2C sensors not detected on the bus during scan. Often caused by address mismatch or loose wiring.",
    solution: "Check SCL/SDA wiring. Ensure pull-up resistors are present. Use an I2C scanner script to verify the sensor's address (commonly 0x68 for MPU6050)."
  },
  {
    code: "HW_002",
    title: "Baud Rate Mismatch",
    category: "Hardware",
    description: "Serial terminal displaying garbled characters or no data. Happens when the controller and terminal use different communication speeds.",
    solution: "Synchronize the baud rate in your code (e.g., Serial.begin(115200)) with the serial monitor setting."
  },
  {
    code: "HW_003",
    title: "Sensor Floating Input",
    category: "Hardware",
    description: "Digital inputs (like buttons) returning inconsistent High/Low values when not pressed.",
    solution: "Implement a pull-down or pull-up resistor (either external 10k ohm or internal INPUT_PULLUP) to stabilize the signal."
  },
  
  // Logic
  {
    code: "LOG_001",
    title: "Off-by-One Error",
    category: "Logic",
    description: "A loop iterates one time too many or one time too few, usually at array boundaries.",
    solution: "Double-check loop conditions (use '<' instead of '<=' for 0-indexed arrays) and verify starting/ending indices."
  },
  {
    code: "LOG_002",
    title: "Race Condition",
    category: "Logic",
    description: "Two processes or threads accessing shared data simultaneously, leading to unpredictable results.",
    solution: "Use locks, mutexes, or atomic operations to ensure only one process modifies data at a time."
  },

  // Network
  {
    code: "NET_001",
    title: "CORS Policy Block",
    category: "Network",
    description: "Browser blocks a request to a different domain for security reasons.",
    solution: "Enable CORS on the server side (e.g., using 'cors' middleware in Express) and allow the specific origin."
  },
  {
    code: "NET_002",
    title: "DNS Resolution Failure",
    category: "Network",
    description: "The system cannot convert the hostname (e.g., api.myservice.com) into an IP address.",
    solution: "Check internet connectivity. Verify the domain's A-record styling or use a hardcoded IP for testing bypass."
  },

  // Deployment
  {
    code: "DEP_001",
    title: "Environment Variable Missing",
    category: "Deployment",
    description: "Application crashes because a required secret or API key is undefined in the environment.",
    solution: "Verify .env files or hosting provider dashboard settings. Ensure sensitive keys aren't hardcoded or missed during CI/CD."
  },
  {
    code: "DEP_002",
    title: "Port Already In Use",
    category: "Deployment",
    description: "Server fails to start because another process is bound to the target port (e.g., 3000).",
    solution: "Identify and kill the process using the port (lsof -i :3000) or change the application's listening port."
  }
];
