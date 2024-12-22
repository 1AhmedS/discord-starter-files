const { ActivityType } = require('discord.js');

module.exports = (_, client) => {
        const stats = {
            servers: client.guilds.cache.size,
            channels: client.channels.cache.size,
            users: client.users.cache.reduce((acc, user) => acc + (!user.bot), 0),
            shards: client.shard?.count || 1,
            memUsed: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        };

        const activities = [
            ` Searving : ${stats.users} User${stats.users !== 1 ? 's' : ''}`,
            ` Managing : ${stats.channels} Channel${stats.channels !== 1 ? 's' : ''} `,
        ];

        let activityIndex = 0;
        let statusIndex = 0;
        const statusTypes = [
            { name: 'online', duration: 30000 },
            { name: 'dnd', duration: 15000 }
        ];

        const activityTypes = [
            ActivityType.Playing,
            ActivityType.Watching,
            ActivityType.Listening,
            ActivityType.Competing,
            ActivityType.Streaming,
            ActivityType.Custom
        ];

        let lastCPUUsage = process.cpuUsage();
        let lastUsageTime = Date.now();

        const updatePresence = async () => {
            const currentTime = Date.now();
            const cpuUsage = process.cpuUsage(lastCPUUsage);
            const elapsedTime = (currentTime - lastUsageTime) / 1000;
            const cpuPercent = ((cpuUsage.user + cpuUsage.system) / (elapsedTime * 1000000)).toFixed(1);

            lastCPUUsage = process.cpuUsage();
            lastUsageTime = currentTime;

            const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
            const currentActivity = activities[activityIndex++ % activities.length];
            const currentStatus = statusTypes[statusIndex++ % statusTypes.length];

            const enrichedActivity = `${currentActivity} | ${memoryUsage}MB | CPU ${cpuPercent}% `;

            try {
                client.user.setPresence({
                    activities: [{
                        name: enrichedActivity,
                        type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
                        url: 'https://www.twitch.tv/1ahmed_s'
                    }],
                    status: currentStatus.name,
                    afk: false
                });

                const nextInterval = cpuPercent > 80 ? 10000 : cpuPercent > 50 ? 5000 : 3000;
                setTimeout(updatePresence, nextInterval);
            } catch (error) {
                log(`Failed to update presence: ${error.message}`, 'error');
                setTimeout(updatePresence, 5000); 
            }
        };

        updatePresence();

        // console.log(`Ready! Serving ${stats.users} users across ${stats.servers} servers`);
    }