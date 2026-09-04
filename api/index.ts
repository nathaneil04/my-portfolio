import express, { Request, Response } from "express";
import { createClient } from "@libsql/client";

const app = express();
app.use(express.json());

// Cloud SQLite Connection (Turso)
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

let isDbInitialized = false;
async function initDb() {
  if (isDbInitialized) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      tier TEXT NOT NULL,
      price TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  isDbInitialized = true;
}

// FRONTEND HTML & UI
const htmlContent = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevPortfolio | Web Developer Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">

    <nav class="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <span class="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                DevPortfolio.ts
            </span>
            <a href="#rates" class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
                Request a Website            </a>
        </div>
    </nav>

    <section class="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <span class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/50 rounded-full">
            Full-Stack Web & Software Developer
        </span>
        <h1 class="text-4xl md:text-6xl font-extrabold mt-6 tracking-tight">
            Let's Bring Your Dream <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Let's Bring Your Dream</span>
        </h1>
        <p class="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
        Fast, modern, and responsive web applications tailored to your business or personal brand.        </p>
    </section>

    <section id="projects" class="py-12 px-6 max-w-6xl mx-auto border-t border-slate-800/50">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold">Featured Web Apps</h2>
            <p class="text-slate-400 mt-2">Explore custom applications built for clients.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Project 1 -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800/50">Architecture Firm Website</span>
                    <h3 class="text-xl font-bold text-white mt-4 mb-2">GraQuins Ensemble Studio</h3>
                    <p class="text-slate-400 text-sm mb-4">Custom outfit catalog and fashion showcase with dynamic product viewing and seamless client inquiries.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">TypeScript</span>
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Express</span>
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Turso SQLite</span>
                    </div>
                </div>
                <a href="https://graquins-ensemble-studio.vercel.app" target="_blank" rel="noopener noreferrer" class="block w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-semibold rounded-xl text-sm transition border border-slate-700/50">
                    Live Demo ↗
                </a>
            </div>

            <!-- Project 2 -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/50">AI Powered Educaional Assistant System</span>
                    <h3 class="text-xl font-bold text-white mt-4 mb-2">EduMind AI</h3>
                    <p class="text-slate-400 text-sm mb-4">Smart AI-powered learning platform providing personalized study assistance, automated summaries, and interactive tutoring.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Node.js</span>
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Tailwind CSS</span>
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">REST API</span>
                    </div>
                </div>
                <a href="https://edumind-ai-snowy.vercel.app/" target="_blank" rel="noopener noreferrer" class="block w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-semibold rounded-xl text-sm transition border border-slate-700/50">
                    Live Demo ↗
                </a>
            </div>

            <!-- Project 3 -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/50">Repairshop Management System</span>
                    <h3 class="text-xl font-bold text-white mt-4 mb-2">Villanueva Repair Shop </h3>
                    <p class="text-slate-400 text-sm mb-4">Digital storefront and service portal for a device repair business featuring online quote requests and repair status tracking.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">TypeScript</span>
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Vercel</span>
                        <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">SQL</span>
                    </div>
                </div>
                <a href="https://villanueva-repair-shop.vercel.app/" target="_blank" rel="noopener noreferrer" class="block w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-semibold rounded-xl text-sm transition border border-slate-700/50">
                    Live Demo ↗
                </a>
            </div>
        </div>
    </section>

    <section id="rates" class="py-12 px-6 max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold">Rates & Packages</h2>
            <p class="text-slate-400 mt-2">Choose a package tailored to your project's needs.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    <h3 class="text-xl font-bold text-slate-200">Landing Page</h3>
                    <p class="text-sm text-slate-400 mt-1">Ideal for personal branding or simple products.</p>
                    <div class="my-6">
                        <span class="text-3xl font-extrabold text-white">₱5,000</span>
                        <span class="text-slate-400 text-sm"> / one-time</span>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li>✓ 1 Page Modern Design</li>
                        <li>✓ Mobile Responsive</li>
                        <li>✓ Contact Form</li>
                    </ul>
                </div>
                <button onclick="selectPackage('Landing Page', '₱5,000')" class="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition">Piliin Ito</button>
            </div>

            <div class="bg-gradient-to-b from-indigo-950/40 to-slate-900 border-2 border-indigo-500 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-indigo-950/50">
                <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                <div>
                    <h3 class="text-xl font-bold text-white">Business Website</h3>
                    <p class="text-sm text-slate-400 mt-1">Perfect for small and medium-sized businesses.</p>
                    <div class="my-6">
                        <span class="text-3xl font-extrabold text-white">₱15,000</span>
                        <span class="text-slate-400 text-sm"> / one-time</span>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li>✓ Up to 5 Pages</li>
                        <li>✓ CMS / Admin Panel</li>
                        <li>✓ Basic SEO Optimization</li>
                    </ul>
                </div>
                <button onclick="selectPackage('Business Website', '₱15,000')" class="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition">Piliin Ito</button>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                    <h3 class="text-xl font-bold text-slate-200">Custom Full-Stack System</h3>
                    <p class="text-sm text-slate-400 mt-1">Complex web apps, e-commerce, or database systems.</p>
                    <div class="my-6">
                        <span class="text-3xl font-extrabold text-white">₱35,000+</span>
                        <span class="text-slate-400 text-sm"> / Varies by scope</span>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li>✓ Custom Database & API</li>
                        <li>✓ User Authentication System</li>
                        <li>✓ Priority Technical Support</li>
                    </ul>
                </div>
                <button onclick="selectPackage('Custom Full-Stack System', '₱35,000+')" class="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition">Piliin Ito</button>
            </div>
        </div>
    </section>

    <section id="form-section" class="py-12 px-6 max-w-2xl mx-auto">
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl font-bold mb-2 text-white">Submit a Quote Request</h3>
            <p class="text-slate-400 text-sm mb-6">Fill out the form below to discuss your website project.</p>

            <form id="quoteForm" onsubmit="submitForm(event)" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">Full name</label>
                    <input type="text" id="name" required class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input type="email" id="email" required class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-1">Selected Package</label>
                        <input type="text" id="tier" readonly required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 cursor-not-allowed">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-1">Rate / Estimated price</label>
                        <input type="text" id="price" readonly required class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 cursor-not-allowed">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-300 mb-1">Project Details</label>
                    <textarea id="details" rows="4" placeholder="Briefly describe what you need built..." class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"></textarea>
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all"> Request</button>
            </form>
            <div id="statusMessage" class="mt-4 text-center text-sm hidden"></div>
        </div>
    </section>

    <section class="py-12 px-6 max-w-5xl mx-auto border-t border-slate-800/80 mt-12">
        <h3 class="text-xl font-bold mb-4 text-slate-300">Live Client Requests (Database Logs)</h3>
        <div class="overflow-x-auto bg-slate-900 border border-slate-800 rounded-xl">
            <table class="w-full text-left text-sm text-slate-400">
                <thead class="bg-slate-950 text-slate-300 border-b border-slate-800">
                    <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">Pangalan</th>
                        <th class="p-3">Email</th>
                        <th class="p-3">Package</th>
                        <th class="p-3">Rate</th>
                        <th class="p-3">Petsa</th>
                    </tr>
                </thead>
                <tbody id="requestsTableBody"></tbody>
            </table>
        </div>
    </section>

    <script>
        function selectPackage(tier, price) {
            document.getElementById('tier').value = tier;
            document.getElementById('price').value = price;
            document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
        }

        async function fetchRequests() {
            const res = await fetch('/api/requests');
            const data = await res.json();
            const tbody = document.getElementById('requestsTableBody');
            tbody.innerHTML = data.map(req => \`
                <tr class="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td class="p-3">#\${req.id}</td>
                    <td class="p-3 font-semibold text-slate-200">\${req.name}</td>
                    <td class="p-3">\${req.email}</td>
                    <td class="p-3">\${req.tier}</td>
                    <td class="p-3 text-indigo-400 font-medium">\${req.price}</td>
                    <td class="p-3 text-xs text-slate-500">\${req.created_at}</td>
                </tr>
            \`).join('');
        }

        async function submitForm(e) {
            e.preventDefault();
            const status = document.getElementById('statusMessage');
            const payload = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                tier: document.getElementById('tier').value,
                price: document.getElementById('price').value,
                details: document.getElementById('details').value
            };

            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                status.className = "mt-4 text-center text-sm text-emerald-400 font-semibold";
                status.innerText = "Matagumpay na naipadala ang iyong request!";
                status.classList.remove('hidden');
                document.getElementById('quoteForm').reset();
                fetchRequests();
            } else {
                status.className = "mt-4 text-center text-sm text-rose-400 font-semibold";
                status.innerText = "Nagkaroon ng error. Pakisubukan ulit.";
                status.classList.remove('hidden');
            }
        }

        selectPackage('Business Website', '₱15,000');
        fetchRequests();
    </script>
</body>
</html>
`;

// SERVERLESS API ROUTES
app.get("/api/requests", async (req: Request, res: Response) => {
  try {
    await initDb();
    const result = await db.execute("SELECT * FROM requests ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/api/requests", async (req: Request, res: Response) => {
  try {
    await initDb();
    const { name, email, tier, price, details } = req.body;
    await db.execute({
      sql: "INSERT INTO requests (name, email, tier, price, details) VALUES (?, ?, ?, ?, ?)",
      args: [name, email, tier, price, details || ""],
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// SERVE FRONTEND UI
app.get("*", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.send(htmlContent);
});

export default app;
