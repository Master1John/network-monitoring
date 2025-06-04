import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
	console.log("Starting seed...");

	// Clean up existing data
	await prisma.loginHistory.deleteMany();
	await prisma.userActivity.deleteMany();
	await prisma.networkPacket.deleteMany();
	await prisma.keylog.deleteMany();
	await prisma.permission.deleteMany();
	await prisma.device.deleteMany();
	await prisma.user.deleteMany();

	console.log("Deleted existing data");

	// Create users
	// const users = await createUsers();
	// console.log(`Created ${users.length} users`);
	//
	// // Create devices for each user
	// const devices = await createDevices(users);
	// console.log(`Created ${devices.length} devices`);
	//
	// // Create keylogs for each device
	// // const keylogs = await createKeylogs(devices);
	// // console.log(`Created ${keylogs.length} keylogs`);
	//
	// // Create network packets for each device
	// const packets = await createNetworkPackets(devices);
	// console.log(`Created ${packets.length} network packets`);
	//
	// // Create user activities for each user
	// const activities = await createUserActivities(users);
	// console.log(`Created ${activities.length} user activities`);
	//
	// // Create login history for each user
	// const loginHistory = await createLoginHistory(users);
	// console.log(`Created ${loginHistory.length} login history entries`);
	//
	// // Create permissions for each user
	// const permissions = await createPermissions(users);
	// console.log(`Created ${permissions.length} permission sets`);

	console.log("Seed completed successfully!");
}

async function createUsers() {
	const userData = [
		{
			name: "John Admin",
			email: "admin@example.com",
			phone: "+1 (555) 123-4567",
			role: "admin",
			status: "active",
			location: "New York, USA",
			department: "IT",
			position: "System Administrator",
			twoFactorEnabled: true,
		},
		{
			name: "Jane Security",
			email: "security@example.com",
			phone: "+1 (555) 234-5678",
			role: "security",
			status: "active",
			location: "San Francisco, USA",
			department: "Security",
			position: "Security Analyst",
			twoFactorEnabled: true,
		},
		{
			name: "Bob User",
			email: "user@example.com",
			phone: "+1 (555) 345-6789",
			role: "user",
			status: "active",
			location: "Chicago, USA",
			department: "Marketing",
			position: "Marketing Manager",
			twoFactorEnabled: false,
		},
		{
			name: "Alice Inactive",
			email: "inactive@example.com",
			phone: "+1 (555) 456-7890",
			role: "user",
			status: "inactive",
			location: "Boston, USA",
			department: "Sales",
			position: "Sales Representative",
			twoFactorEnabled: false,
		},
		{
			name: "Charlie Locked",
			email: "locked@example.com",
			phone: "+1 (555) 567-8901",
			role: "user",
			status: "locked",
			location: "Seattle, USA",
			department: "Finance",
			position: "Financial Analyst",
			twoFactorEnabled: true,
		},
	];

	const users = [];

	for (const user of userData) {
		const createdUser = await prisma.user.create({
			data: {
				...user,
				lastActive: new Date(),
				joinDate: new Date(
					Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
				), // Random date in the last 90 days
			},
		});
		users.push(createdUser);
	}

	return users;
}

async function createDevices(users) {
	const deviceTypes = [
		"workstation",
		"laptop",
		"mobile",
		"server",
		"router",
		"switch",
		"printer",
		"iot",
	];
	const manufacturers = [
		"Dell",
		"HP",
		"Apple",
		"Cisco",
		"Lenovo",
		"Samsung",
		"Microsoft",
		"Asus",
	];
	const operatingSystems = [
		"Windows 11",
		"Windows 10",
		"macOS Monterey",
		"Ubuntu 22.04",
		"iOS 16",
		"Android 13",
		"Cisco IOS",
		"RouterOS",
	];

	const devices = [];

	for (const user of users) {
		// Create 2-4 devices per user
		const numDevices = Math.floor(Math.random() * 3) + 2;

		for (let i = 0; i < numDevices; i++) {
			const type = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
			const manufacturer =
				manufacturers[Math.floor(Math.random() * manufacturers.length)];
			const os =
				operatingSystems[Math.floor(Math.random() * operatingSystems.length)];

			// Generate a realistic IP address
			const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

			// Generate a realistic MAC address
			const mac = Array.from({ length: 6 }, () =>
				Math.floor(Math.random() * 256)
					.toString(16)
					.padStart(2, "0"),
			).join(":");

			const device = await prisma.device.create({
				data: {
					name: `${type}-${randomUUID().substring(0, 4)}`,
					type,
					ip,
					mac,
					lastSeen: new Date(
						Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000,
					), // Random time in the last 24 hours
					os,
					manufacturer,
					model: `Model-${Math.floor(Math.random() * 1000)}`,
					installedDate: new Date(
						Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000,
					), // Random date in the last year
					metrics: {
						cpu: Math.floor(Math.random() * 100),
						memory: Math.floor(Math.random() * 100),
						disk: Math.floor(Math.random() * 100),
						battery:
							type === "mobile" || type === "laptop"
								? Math.floor(Math.random() * 100)
								: null,
					},
					userId: user.id,
				},
			});

			devices.push(device);
		}
	}

	return devices;
}

// async function createKeylogs(devices) {
// 	const keylogTypes = ["Application", "Browser", "System"];
//
// 	const keylogs = [];
//
// 	for (const device of devices) {
// 		// Create 5-15 keylogs per device
// 		const numKeylogs = Math.floor(Math.random() * 11) + 5;
//
// 		for (let i = 0; i < numKeylogs; i++) {
// 			const type = keylogTypes[Math.floor(Math.random() * keylogTypes.length)];
//
// 			// Some keylogs are flagged
//
// 			// const keylog = await prisma.keylog.create({
// 			// 	data: {
// 			// 		mac,
// 			// 		ip,
// 			// 		timestamp: new Date(
// 			// 			Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
// 			// 		), // Random time in the last week
// 			// 		deviceId: device.id,
// 			// 	},
// 			// });
//
// 			// keylogs.push(keylog);
// 		}
// 	}
//
// 	// return keylogs;
// }

async function createNetworkPackets(devices) {
	const protocols = [
		"HTTP",
		"HTTPS",
		"FTP",
		"SSH",
		"DNS",
		"SMTP",
		"NTP",
		"SNMP",
	];
	const statuses = ["success", "blocked"];
	const directions = ["inbound", "outbound"];

	const packets = [];

	for (const device of devices) {
		// Create 20-50 packets per device
		const numPackets = Math.floor(Math.random() * 31) + 20;

		for (let i = 0; i < numPackets; i++) {
			const protocol = protocols[Math.floor(Math.random() * protocols.length)];
			const status = statuses[Math.floor(Math.random() * statuses.length)];
			const direction =
				directions[Math.floor(Math.random() * directions.length)];

			// Generate source and destination IPs
			const sourceIp =
				direction === "outbound"
					? device.ip
					: `203.0.113.${Math.floor(Math.random() * 255)}`;
			const destIp =
				direction === "outbound"
					? `203.0.113.${Math.floor(Math.random() * 255)}`
					: device.ip;

			// Generate port based on protocol
			let port;
			switch (protocol) {
				case "HTTP":
					port = 80;
					break;
				case "HTTPS":
					port = 443;
					break;
				case "FTP":
					port = 21;
					break;
				case "SSH":
					port = 22;
					break;
				case "DNS":
					port = 53;
					break;
				case "SMTP":
					port = 25;
					break;
				case "NTP":
					port = 123;
					break;
				case "SNMP":
					port = 161;
					break;
				default:
					port = Math.floor(Math.random() * 65535);
			}

			// Generate packet size
			const size = Math.floor(Math.random() * 10000) + 100; // 100 to 10100 bytes

			const packet = await prisma.networkPacket.create({
				data: {
					source: sourceIp,
					destination: destIp,
					protocol,
					port,
					size,
					direction,
					status,
					timestamp: new Date(
						Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000,
					), // Random time in the last 24 hours
					deviceId: device.id,
				},
			});

			packets.push(packet);
		}
	}

	return packets;
}

async function createUserActivities(users) {
	const actions = ["login", "settings", "security", "user", "device", "locked"];
	const details = [
		"Logged in from 192.168.1.101",
		"Updated network monitoring rules",
		"Changed security settings",
		"Created new user account",
		"Added new device",
		"Account locked due to multiple failed login attempts",
		"Reset password for user",
		"Reviewed security alerts",
		"Updated user permissions",
		"Deleted device from inventory",
	];
	const severities = ["info", "warning", "critical"];

	const activities = [];

	for (const user of users) {
		// Create 10-20 activities per user
		const numActivities = Math.floor(Math.random() * 11) + 10;

		for (let i = 0; i < numActivities; i++) {
			const action = actions[Math.floor(Math.random() * actions.length)];
			const detail = details[Math.floor(Math.random() * details.length)];

			// Determine severity based on action
			let severity;
			if (action === "locked") {
				severity = "critical";
			} else if (action === "security") {
				severity = Math.random() < 0.5 ? "warning" : "info";
			} else {
				severity = severities[Math.floor(Math.random() * severities.length)];
			}

			const activity = await prisma.userActivity.create({
				data: {
					action,
					details: detail,
					severity,
					timestamp: new Date(
						Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
					), // Random time in the last 30 days
					userId: user.id,
				},
			});

			activities.push(activity);
		}
	}

	return activities;
}

async function createLoginHistory(users) {
	const statuses = ["success", "failed"];
	const devices = [
		"Windows 11 / Chrome",
		"Windows 10 / Firefox",
		"macOS / Safari",
		"macOS / Chrome",
		"iOS / Safari",
		"Android / Chrome",
		"Linux / Firefox",
		"Windows 11 / Edge",
	];
	const locations = [
		"New York, USA",
		"San Francisco, USA",
		"Chicago, USA",
		"Boston, USA",
		"Seattle, USA",
		"Austin, USA",
		"Denver, USA",
		"Miami, USA",
	];
	const failReasons = [
		"Invalid password",
		"Account locked",
		"IP address blocked",
		"Suspicious location",
		"Two-factor authentication failed",
	];

	const loginHistory = [];

	for (const user of users) {
		// Create 5-15 login attempts per user
		const numLogins = Math.floor(Math.random() * 11) + 5;

		for (let i = 0; i < numLogins; i++) {
			// Users with "locked" status have more failed attempts
			const status =
				user.status === "locked" && i < 3
					? "failed"
					: statuses[Math.floor(Math.random() * statuses.length)];
			const device = devices[Math.floor(Math.random() * devices.length)];
			const location = locations[Math.floor(Math.random() * locations.length)];

			// Generate IP address
			const ipAddress = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

			// Determine if two-factor was used
			const twoFactor = user.twoFactorEnabled && status === "success";

			// Add reason for failed logins
			const reason =
				status === "failed"
					? failReasons[Math.floor(Math.random() * failReasons.length)]
					: null;

			const login = await prisma.loginHistory.create({
				data: {
					ipAddress,
					location,
					device,
					status,
					twoFactor,
					reason,
					timestamp: new Date(
						Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
					), // Random time in the last 30 days
					userId: user.id,
				},
			});

			loginHistory.push(login);
		}
	}

	return loginHistory;
}

async function createPermissions(users) {
	const permissions = [];

	for (const user of users) {
		let permissionsData;

		switch (user.role) {
			case "admin":
				permissionsData = {
					dashboard: { view: true, edit: true },
					users: { view: true, create: true, edit: true, delete: true },
					devices: { view: true, create: true, edit: true, delete: true },
					keylogs: { view: true, export: true, delete: true },
					network: { view: true, configure: true },
					security: { view: true, configure: true },
					settings: { view: true, edit: true },
				};
				break;
			case "security":
				permissionsData = {
					dashboard: { view: true, edit: false },
					users: { view: true, create: false, edit: false, delete: false },
					devices: { view: true, create: false, edit: false, delete: false },
					keylogs: { view: true, export: true, delete: false },
					network: { view: true, configure: false },
					security: { view: true, configure: true },
					settings: { view: false, edit: false },
				};
				break;
			default: // user
				permissionsData = {
					dashboard: { view: true, edit: false },
					users: { view: false, create: false, edit: false, delete: false },
					devices: { view: true, create: false, edit: false, delete: false },
					keylogs: { view: false, export: false, delete: false },
					network: { view: false, configure: false },
					security: { view: false, configure: false },
					settings: { view: false, edit: false },
				};
		}

		const permission = await prisma.permission.create({
			data: {
				role: user.role,
				permissions: permissionsData,
				userId: user.id,
			},
		});

		permissions.push(permission);
	}

	return permissions;
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
