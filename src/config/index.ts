import dotenv from "dotenv";

dotenv.config();

const mongoUsername: string = process.env.MONGO_USERNAME || "";
const mongoPassword: string = process.env.MONGO_PASSWORD || "";
const mongoUrl: string = process.env.MONGO_URL || "";
const port: number = process.env.PORT ? Number(process.env.PORT) : 800;

type Config = {
  mongo: {
    url: string;
  };
  server: {
    port: number;
  };
};

export const config: Config = {
  mongo: {
    url: mongoUrl,
  },
  server: {
    port: port,
  },
};
