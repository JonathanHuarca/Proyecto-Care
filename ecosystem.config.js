module.exports = {
  apps : [{
    name   : "api_care",
    script : "dist/index.js",
    instances : "max",
    error_file: "./log/api_care_log.log",
    out_file: "./log/api_care_log.log",
    exec_mode : "cluster",
    kill_timeout : 3000,
    exp_backoff_restart_delay: 100,
    restart_delay: 3000,
    wait_ready : true,
    shutdown_with_message : true,
    max_memory_restart: '1000M',
    args: [
      "--color"
    ],
    env: {
      NODE_ENV: 'development',
    },
    env_staging: {
      NODE_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
      PORT:4200,
      JWT_SECRET:'secretkey',
      MONGO_URL_ATLAS:'mongodb+srv://academy-team:9wJgJ3VvUkKqz5Ii@cluster0-yueol.mongodb.net/api-care?retryWrites=true&w=majority',
      ID:'AKIAI7GES2KJINC3WXMQ',
      SECRET:'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',
      BUCKET_NAME:'care-files'
    },
  }]
}
