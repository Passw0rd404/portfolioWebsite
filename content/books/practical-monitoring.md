---
title: "Practical Monitoring"
author: "Mike Julian"
date: "2026-10-24"
summary: "My chapter-by-chapter notes on Practical Monitoring by Mike Julian, from anti-patterns and statistics to application, server, network and security monitoring, plus my honest review."
cover: "/images/books/practical-monitoring.png"
tags: ["Monitoring", "DevOps", "Observability", "Alerting"]
rating: 4
published: true
---

## About these notes

These are my notes on the first ten chapters of Practical Monitoring by Mike Julian. Part I covers the principles (chapters 1 to 4) and Part II covers the tactics (chapters 5 to 10). My own opinion and rating are at the end.

## Chapter 1: Monitoring Anti-Patterns

Julian defines an anti-pattern as a practice that looks like a good idea at first but backfires badly when you implement it. The chapter covers the bad habits teams pick up over time.

### Anti-Pattern 1: Tool Obsession

Organizations often believe that buying a new tool, or finding a single silver bullet, will fix their monitoring problems.

- **Monitoring is many complex problems.** It spans server hardware, OS metrics, network infrastructure, databases, and application code. Because it is such a broad set of problems, expecting one tool to handle everything is unrealistic. A mature setup is a toolbox of both general and specialized tools.
- **The observer effect is negligible.** Modern systems can easily handle the tiny resource load that monitoring agents add. Avoiding agents leaves you with inflexible "agentless" monitoring that severely restricts visibility.
- **Managing tool creep.** Having multiple tools is only a problem if they cannot work together or correlate data. To audit tool adoption, talk informally with team managers and cross-reference software and SaaS spending with accounting records.
- **Avoid cargo-culting tools.** Do not blindly copy tools or workflows published by tech giants like Google or Netflix, assuming those tools caused their success. Always check whether a tool's underlying assumptions match your own environment and culture.
- **Custom tools vs. custom platforms.** Building small, specialized internal scripts for unique gaps is fine. Building a whole monitoring platform from scratch is rarely a good investment.
- **The "single pane of glass" is a myth.** The belief that all monitoring data must live on one dashboard or in one tool is wrong. Effective monitoring usually means multiple tools feeding multiple specialized dashboards.

### Anti-Pattern 2: Monitoring-as-a-Job

This is treating monitoring as the sole responsibility of one person or one isolated department.

- **Monitoring is a skill, not a role.** You cannot properly build monitoring for a system you do not understand. Software, network, and systems engineers all need this skill, because they know their own services best.
- **Production-ready standard.** A service is not ready for production until it has proper monitoring in place.
- **Role of observability teams.** A central team that builds self-service monitoring tooling for everyone else is a valid setup, as long as that team is not the one writing the alerts and instrumenting the applications for everyone.

### Anti-Pattern 3: Checkbox Monitoring

This is deploying monitoring only to satisfy management demands or compliance rules. It leads to noisy, ineffective systems where alerts are routinely ignored.

- **Monitor what "working" actually means.** Instead of checking low-level stats first, define what a working service looks like (for example, an HTTP GET returning 200 OK, the expected body text, and low latency) and monitor that.
- **OS metrics are for troubleshooting, not alerting.** CPU, RAM, and load average are essential for diagnosis, but 99% of the time they should not wake someone up if the application itself is working normally.
- **Collect metrics frequently.** Collecting only every 5 minutes leaves you blind to short spikes and intermittent failures. Collect every 60 seconds, or every 10 to 30 seconds for high-traffic apps, and set up automated roll-ups to save disk space.

### Anti-Pattern 4: Using Monitoring as a Crutch

This is constantly adding more monitoring checks around fragile, poorly written code instead of fixing the underlying system.

- **Fix the root cause.** Monitoring tells you when things go wrong, but adding more of it does not make a system stable. Engineering effort has to go into fixing technical debt and building resilience.

### Anti-Pattern 5: Manual Configuration

This is manually configuring checks, nodes, and parameters instead of automating the setup.

- **Automate everything.** Modern cloud infrastructure needs monitoring of whole classes of dynamic systems, not individual static servers. Monitoring should be fully automated so services register themselves when they launch.
- **Avoid runbook abuse.** Runbooks are for situations that need human judgment during incidents. If a runbook is just simple, repetitive commands, turn those steps into a self-healing script that the monitoring system runs directly.

## Chapter 2: Monitoring Design Patterns

This chapter introduces four design patterns to replace the anti-patterns from Chapter 1.

### Pattern 1: Composable Monitoring

Composable monitoring means building a monitoring platform by loosely coupling multiple specialized tools, rather than relying on one monolithic platform like Nagios. It follows Doug McIlroy's Unix philosophy: write programs that do one thing and do it well, and write programs that work together.

It came out of early community discussions (#monitoringsucks, #monitoringlove, and the Monitorama conference). Its big advantage is flexibility: you can swap or replace individual tools (Graphite, Sensu, Loggly, Prometheus, and so on) as your needs change, without tearing down your whole monitoring architecture.

A monitoring service has five primary components.

**1. Data collection**

- **Pull model:** a central monitoring server polls remote nodes on a schedule (SNMP, Nagios checks, or `/health` HTTP endpoints). It can be hard to scale because the central poller has to track every client, coordinate schedules, and parse incoming data.
- **Push model:** nodes push metrics or logs out as events happen or on a schedule (syslog forwarding, collectd, StatsD). It scales more easily in dynamic cloud environments and gives better redundancy.
- **Metrics:** numerical data. *Counters* are ever-increasing values like web traffic or network bytes, which eventually roll over. *Gauges* are point-in-time snapshots like CPU temperature or a speedometer, and you need a time-series database to track their past trends.
- **Logs:** timestamps attached to text containing rich context. *Unstructured* logs are freeform text, best for low-volume logs read with grep or tail. *Structured* logs use an explicit key-value format like JSON, which makes machine parsing effortless.

**2. Data storage**

- **Metrics storage:** metrics go in a time-series database (TSDB). Roll-ups summarize high-frequency raw data into 5-minute or hourly averages over time, which saves disk space and speeds up graph rendering. Julian says the trade-off is fine because operational interest is mostly in recent events and broad historical trends.
- **Log storage:** logs are kept as flat files or indexed in search engines like Elasticsearch. Because of their high volume, they are managed with retention policies and compression.

**3. Visualization**

Frontend dashboards (Grafana, Smashing) display metrics and logs clearly. The most effective dashboards show the status of a single service or product, and are built and maintained by the engineers who know that service best.

**4. Analytics and reporting**

This is used mainly to track service-level availability (SLAs). Availability is simply how much of the total time the service was up. Julian cautions that SLAs are often "hopes and lies." He also points to the Nyquist-Shannon sampling theorem: to reliably catch a 2-minute outage, you have to collect data at intervals shorter than a minute. An application's availability can never exceed the availability of the infrastructure under it. For example, a single AWS EC2 region offers a 99.95% SLA, which is roughly 4 hours of downtime per year.

**5. Alerting**

Alerting is only one outcome of monitoring, not its only purpose. Julian quotes Dave Josephsen: "Monitoring is for asking questions." So not every metric you collect needs an alert attached.

### Pattern 2: Monitor from the User Perspective

- **Start at the outside.** When deciding where to start instrumenting, begin where users interact with your application (load balancers, HTTP entry points), not deep in the infrastructure.
- **Focus on what users care about.** Users do not care about Apache worker pools or database thread counts. They care whether the application works.
- **Key entry metrics.** Start with high-level indicators like HTTP 5xx error rates and request latency.
- **Evaluate user impact.** If database CPU spikes but request latency and error rates stay normal, it is not an immediate emergency. Instrument deeper components over time, but always judge metrics by their actual impact on the user.

### Pattern 3: Buy, Not Build

- **The tool progression.** Companies usually start with SaaS tools, move to open-source software (Graphite, InfluxDB, Sensu, Prometheus) as requirements grow, and only huge tech giants (Netflix, Twitter, Dropbox) build entirely custom monitoring platforms.
- **The true cost of in-house platforms.** Building in-house means full-time salaries, ongoing maintenance, and a big opportunity cost, because engineers spend months building monitoring tools instead of product features.
- **Why SaaS is cheaper.** Paying 6,000 to 9,000 dollars per year for a SaaS monitoring solution is far cheaper than dedicating several engineers to building and maintaining custom tooling.
- **Specialized expertise.** Running a high-throughput monitoring pipeline takes specialized knowledge. SaaS providers let you buy that expertise so your team can stay focused on the core product.

### Pattern 4: Continual Improvement

- **It is a long-term process.** World-class monitoring is not built in a week or a year. It comes from months and years of continuous refinement.
- **Architectures evolve.** As the business, the applications, and the technology stack change, expect to re-architect or replace your monitoring setup every two to three years.

## Chapter 3: Alerts, On-Call, and Incident Management

This chapter is about designing effective alerts, building sustainable on-call rotations, and handling incidents without burning people out.

### Alerts vs. messages

- **Alerts** need immediate action. They mean a system is down or about to go down and a human has to step in (for example, all web servers are unreachable).
- **Messages (FYIs)** need awareness but no immediate action (for example, an overnight backup job failed, or an auto-healing script ran). These belong in chat rooms, dashboards, or automated ticketing systems, not in pages.

### Six practices for good alerting

1. **Stop using email for alerts.** Email will not wake anyone up at 3 a.m. and quickly turns into inbox noise and alert fatigue. Route by urgency: immediate action goes to pagers or alerting services (SMS, PagerDuty), non-urgent awareness goes to chat rooms or ticket queues, and diagnostic or historical information goes to central log files. Always keep alert logs so you can report on SLAs and spot problem services.
2. **Write runbooks.** Link every alert to a runbook. A good runbook explains what the service does, who owns it, its dependencies and architecture, the metrics and logs it emits, and specific troubleshooting steps. If a runbook is only a static list of copy-paste shell commands, automate those commands in code and delete the alert. Runbooks are for situations that need human judgment.
3. **Move beyond arbitrary static thresholds.** A rule like "alert if free disk space is under 10%" misses critical events, such as a disk filling from 11% to 80% overnight. Use rate-of-change metrics (for example, "disk usage grew 50% overnight") or statistical methods like moving averages and percentiles.
4. **Delete and tune alerts to fight alert fatigue.** Alert fatigue desensitizes people, slows response times, and causes burnout. Verify that every alert requires action, review 30 days of alert history to delete non-actionable alerts or adjust thresholds, and build automation to eliminate recurring alerts.
5. **Use maintenance periods.** Silence known alerts during scheduled maintenance so the team is not distracted. Avoid overly broad blanket silences, or you may miss unexpected dependency issues.
6. **Attempt automated self-healing first.** If an alert has a standard, repeated fix, let the monitoring system run an automated self-healing script first. Only page a human if the self-healing fails.

### A better on-call experience

- **Daily false-alarm tuning.** The on-call engineer reviews every alert that fired in the last 24 hours and deletes unhelpful checks or improves their signal quality.
- **Reduce firefighting.** Monitoring finds failures, but only engineering effort fixes technical debt. Dedicate time to resiliency during the on-call shift, or explicitly allocate sprint planning time the following week to fix root causes.
- **Rotation schedules.** Avoid permanent "unofficial" on-call setups. Use formal rotations (for example, 4 people, 1 week on, 3 weeks off).
- **Mid-week handoffs.** Start shifts on a weekday (for example, Wednesday at 10 a.m.) rather than Monday, so there is room for a structured handoff discussion.
- **Avoid backup on-call.** Unless the team is large (8 or more people), skip the secondary backup person. It effectively puts engineers on call twice as often and speeds up burnout.
- **Follow-the-sun.** Large organizations should split rotations across time zones (for example London, Los Angeles, and Sydney) so nobody is on call overnight.
- **Include software engineers.** Putting software engineers in the on-call rotation alongside operations aligns incentives for reliable code and builds mutual empathy.
- **Compensation.** Give a paid day off right after an on-call shift to recover, and offer extra financial compensation for on-call duty.

### Incident management and roles

Julian adapts the ITIL incident framework into a lightweight 5-step process:

1. **Identification:** monitoring detects a failure.
2. **Logging:** monitoring automatically opens an incident ticket.
3. **Diagnosis, resolution, and closure:** the on-call engineer troubleshoots, resolves the issue, and updates the ticket.
4. **Communication:** stakeholders are updated as needed.
5. **Post-incident remediation:** build long-term resilience into the system.

For major outages, each person should focus on a single assigned role:

- **Incident Commander (IC):** makes high-level decisions and oversees the investigation. Does not troubleshoot code or handle communications.
- **Scribe:** documents timeline events, decisions, and action items in real time.
- **Communication Liaison:** sends status updates to internal and external stakeholders and shields the engineers from interruptions by management. This is a good role for team managers.
- **Subject Matter Experts (SMEs):** the engineers actively investigating and repairing the technical failure.

### Postmortems and blameless culture

After an outage, run a structured postmortem to understand what happened and how to prevent it from happening again. Julian strongly warns against a blame culture. If engineers fear punishment or public shaming for human error, they will cover up mistakes, and the organization never fixes the deeper systemic problems.

## Chapter 4: Statistics Primer

This chapter introduces the basic statistical ideas that turn noisy, ineffective alerts into accurate, useful ones.

### Before statistics: the problem with traditional threshold checks

- **The Nagios legacy.** Traditional tools collect a metric and immediately compare its single, latest value against an arbitrary static threshold (for example, warning at 4, critical at 10).
- **Noisy flapping.** Real-world metrics naturally move up and down. If a metric swings back and forth across a static line, it produces a flood of false alarms.
- **Flap detection is a band-aid.** Flap detection silences a check that swings too often between "OK" and "alerting," but it only hides bad alerting rules instead of fixing the quality of the signal.
- **Decouple collection from alerting.** Store raw metrics in a time-series database at regular intervals, and keep that separate from alert checking. Instead of judging only the latest datapoint, alerts should look at a window of historical metrics.

### Mean (average)

The mean is the sum of all the values divided by how many values there are.

```
mean = (v1 + v2 + ... + vn) / n
```

**Example:** five response times in milliseconds: 100, 120, 110, 130, 90.

```
sum  = 100 + 120 + 110 + 130 + 90 = 550
mean = 550 / 5 = 110 ms
```

It gives a quick summary of what a dataset looks like without examining every entry.

### Moving (rolling) average

A moving average is the mean calculated over only the most recent N datapoints, and it is recalculated every time a new datapoint arrives. The window slides forward one step at a time. Time-series databases use it to smooth out spiky graphs and show broader trends.

**Example:** CPU usage in percent: 20, 80, 25, 30, 90, 35, with a window of 3.

```
window 1: (20 + 80 + 25) / 3 = 41.7
window 2: (80 + 25 + 30) / 3 = 45.0
window 3: (25 + 30 + 90) / 3 = 48.3
window 4: (30 + 90 + 35) / 3 = 51.7
```

The raw data jumps between 20 and 90, but the smoothed line stays between about 42 and 52.

**The smoothing trade-off.** In the example above, the spikes to 80 and 90 almost disappeared. That makes patterns easier to see, but too much smoothing removes the extreme spikes that may point to a real operational problem. Finding the right smoothing interval is a balancing act.

### Median

The median is the middle value of a sorted dataset.

```
position of the middle value = (n + 1) / 2
```

**Example with an odd number of values:** 100, 120, 110, 130, 90.

```
sorted:   90, 100, 110, 120, 130
position: (5 + 1) / 2 = 3rd value
median:   110 ms
```

**Example with an even number of values:** 90, 100, 110, 120. There is no single middle value, so take the mean of the two middle ones.

```
median = (100 + 110) / 2 = 105 ms
```

**Why the median is resistant to outliers.** Take the first example again, but imagine the last request was a huge spike of 2000 ms instead of 130 ms: 100, 120, 110, 2000, 90.

```
mean   = (100 + 120 + 110 + 2000 + 90) / 5 = 2420 / 5 = 484 ms
median = sorted: 90, 100, 110, 120, 2000 -> middle value = 110 ms
```

One outlier pushed the mean from 110 to 484, which does not describe any of the real requests, while the median did not move. The median is a far better representation than the mean for data with extreme outliers or heavy skew in one direction.

### Seasonality

Seasonality means metrics that follow repeating cycles over time, like web traffic dropping overnight and peaking on weekday afternoons.

Instead of alerting against a fixed number, compare the current value with the same period in the past (1 hour ago, 1 day ago, 1 week ago).

**Example:** traffic on a Tuesday afternoon is normally around 100 requests per second. A static threshold of "alert below 10" would stay silent while traffic falls to 20. Compared with the same time last week, a drop from 100 to 20 is an 80% fall, which is clearly an anomaly worth investigating.

### Percentiles

A percentile marks a point in a sorted dataset. The Nth percentile is the value that N% of the datapoints are at or below.

**Example:** ten request latencies in milliseconds, already sorted: 100, 110, 120, 130, 140, 150, 160, 170, 180, 2000.

```
90th percentile: 90% of 10 values = the 9th value = 180 ms
maximum:         2000 ms
mean:            3260 / 10 = 326 ms
```

The 90th percentile drops the worst 10% as outliers and shows what the majority of users experience (180 ms). The mean (326 ms) is dragged up by the single 2000 ms spike, and it describes nobody's real experience.

- **Common uses.** Network bandwidth billing (95th percentile) and application latency reporting.
- **Track the max alongside percentiles.** Percentiles deliberately ignore extreme outliers, so always track the maximum latency too, to see the worst-case user experience. In the example, the max (2000 ms) shows the one very bad request that the 90th percentile hides.

**Never average percentiles.** Percentiles throw away part of the dataset, so you cannot average daily percentiles to get a weekly percentile.

**Example:** on Monday you served 1000 requests and the 95th percentile was 200 ms. On Tuesday you served only 10 requests and the 95th percentile was 900 ms. Averaging gives (200 + 900) / 2 = 550 ms. That number is wrong, because it treats 10 requests as equally important as 1000, and the real weekly percentile depends on all 1010 raw requests. Always compute percentiles from the raw data.

### Standard deviation

Standard deviation measures how spread out the datapoints are from the mean. In a normal distribution (a bell curve), about 68% of the data falls within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3.

Julian points out that it rarely works for IT operations. It assumes a normal distribution, but most system metrics are not normally distributed. They are heavily skewed, bounded (CPU is bounded between 0% and 100%, and latency is bounded at 0 on the low end but can be unbounded on the high end), or have multiple peaks. Using standard deviation on metrics like these leads to misleading alerts, unless you have verified that the data really follows a normal distribution.

## Chapter 5: Monitoring the Business

This chapter moves from low-level infrastructure to high-level business goals. Julian argues that monitoring from the outside, from the point of view of the user and the executive, is far more effective than starting deep inside the system, because it directly answers whether the business and the application actually work.

### Business KPIs

Executives and business owners generally care about five questions:

- Are customers able to use the app or service?
- Are we making money?
- Are we growing, shrinking, or stagnant?
- How profitable are we?
- Are our customers happy?

Common business metrics:

- **Monthly Recurring Revenue (MRR):** predictable monthly subscription revenue.
- **Revenue per customer and number of paying customers:** customer density and revenue growth.
- **Net Promoter Score (NPS):** customer satisfaction on a scale of 1 to 10.
- **Customer Acquisition Cost (CAC):** how much marketing and sales spend to acquire a new user.
- **Customer churn:** the rate at which users leave the service. High churn can point to product defects, poor performance, or pricing problems.
- **Active users:** Daily (DAU), Weekly (WAU), or Monthly (MAU) active users.
- **Burn rate:** total spending on salaries, office space, and infrastructure.

### Two real-world examples: Yelp and Reddit

Core business functions can double as high-level monitoring indicators.

- **Yelp:** searches performed, reviews placed, user signups, business pages claimed, active users, and ads purchased. These are leading indicators. If search or the backend database slows down, the number of searches drops naturally, which signals a problem before lower-level server alerts fire.
- **Reddit:** users currently on the site, logins, comments posted, threads submitted, votes cast, private messages sent, and Reddit Gold or ads purchased. Drops or spikes in these actions immediately show whether the main product experience is intact.

### Tying business KPIs to technical metrics

High-level action counts (like total logins) do not always reveal backend failures. Splitting each action into failures and latency connects business KPIs to technical operations:

- User logins: track login failures and login latency.
- Comments, threads, reviews: track submission failures and submission latency.
- Purchases (ads, Gold): track transaction failures and checkout latency.

Latency getting worse is often an early warning of an outage before a complete failure happens.

### Finding and exposing business KPIs in your app

- **Change the code to expose metrics.** If your application does not output business metrics, software engineers have to instrument it to emit them. Unlike a physical car, software can be updated continuously to add instrumentation wherever visibility is missing.
- **Talk to people outside engineering.** Talk directly to product managers, engineering managers, and senior developers to learn which metrics matter.
- **Ask the right questions.** "If I were new to the company, how would I know the app is working? What do you check?" and "What are the core KPIs for our app, and why do they matter?"
- **Map the journey.** Sketch the user journey at a high level (login, search, database lookup, checkout) to see where latency and error-rate metrics need to be added.

## Chapter 6: Frontend Monitoring

Operations teams traditionally focus on server-side availability, but user satisfaction and business performance depend heavily on browser load times and client-side JavaScript execution. This is a common blind spot.

### The cost of a slow application

- **Frontend vs. backend.** The frontend is everything parsed and executed on the client side, in the browser or native mobile app (HTML, CSS, JavaScript, static images). The backend handles server-side code, database queries, and internal API calls.
- **Single-page apps (SPAs).** In SPAs built with React, Angular, or Ember, page resources load dynamically in the background without full page refreshes. JavaScript errors can spike dramatically without producing any server-side HTTP 5xx errors.
- **A different goal.** For servers, the goal is mostly staying up. For the frontend, the goal is loading quickly.
- **The financial impact of speed:**
  - Aberdeen Research (2010): a 1-second page load delay causes an 11% drop in page views, a 7% loss in conversions, and a 16% drop in customer satisfaction. The sweet spot is under 2 seconds, and business metrics suffer badly once load time goes beyond 5.1 seconds.
  - Shopzilla: cut load time from 6 seconds to 1.2 seconds and got a 12% revenue increase and a 25% boost in page views.
  - Amazon: measured a 1% revenue increase for every 100 ms of load-time improvement.
  - Pinterest (2017): a frontend performance push cut perceived wait times by 40% and increased SEO traffic and signups by 15% each.
- **Target load time.** Aim for a total page load time under 4 seconds. For comparison, Amazon kept roughly 2.4 second load times during Prime Day 2017 under massive global traffic.

### Real User Monitoring (RUM) vs. synthetic monitoring

- **Real User Monitoring (RUM):** a lightweight JavaScript snippet on every page sends performance metrics back to the monitoring service whenever a real user loads the page. RUM is the foundation of frontend monitoring because it measures real conditions across different devices, locations, and network speeds.
- **Synthetic monitoring:** simulated, automated requests (for example with WebpageTest.org) in controlled test environments.

### The DOM and JavaScript impact

- **HTML vs. the DOM.** The DOM is the browser's logical, tree-like representation of a page. Static HTML matches the initial DOM, but client-side JavaScript changes elements on the fly, so the rendered DOM drifts away from the original source.
- **Synchronous blocking.** By default, browsers load `<script>` tags synchronously. When the browser hits a script tag, it stops parsing the DOM until the script is fully downloaded, parsed, and executed.
- **The `async` attribute.** HTML5 script tags support `async`, which lets a script download in the background without blocking DOM parsing.
- **Script volume matters.** Julian notes that cnn.com loaded 55 scripts (8.29 seconds) while google.com loaded only 5 (0.89 seconds).

### Key frontend performance metrics

- **Navigation Timing API (W3C):** browsers expose 21 native timing metrics. The five most important to trend are:
  - `navigationStart`: when the user or browser first requests the page.
  - `domLoading`: when the browser starts building the DOM.
  - `domInteractive`: when the page is usable for the user, even if non-essential assets are still loading.
  - `domContentLoaded`: when all scripts have been executed.
  - `domComplete`: when all HTML, CSS, JavaScript, and images have fully loaded.
- **Computed values:**
  - Total page load time: `domComplete` minus `navigationStart`.
  - Perceived load time: `domInteractive` minus `navigationStart`.
  - **Speed Index:** developed by WebpageTest. It uses video capture at 10 frames per second to work out when a page looks visually complete to the user, and gives one score where lower is better.

### Exception logging and CI/CD integration

- **Production exception logging.** `console.log()` is fine for local debugging, but production needs a dedicated exception-tracking tool (like Sentry, a SaaS) to automatically capture client-side JavaScript runtime errors.
- **Automated CI/CD testing.** Frontend performance tends to get worse as features are added. To prevent regressions, plug private WebpageTest instances into your CI pipeline through the API (for example, testing pull requests) to catch slower load times before code is merged into production.

## Chapter 7: Application Monitoring

Application code changes much more often than infrastructure, yet it is often treated as an unobservable black box. This chapter covers instrumenting code with metrics and logs, tracking deployments, building health endpoints, and observing microservices.

### Instrumenting apps with metrics and StatsD

- **Why instrument code.** Metrics inside the application give visibility into database query times, external API response times, and business logic execution.
- **The limit of APM tools.** Application Performance Monitoring tools automatically capture waterfall charts and slow queries, but they do not know your business logic or your critical workflow paths. Manual instrumentation fills that gap.
- **StatsD.** Created by Etsy in 2011, StatsD is a lightweight, tool-agnostic standard for instrumenting code.
- **Non-blocking design.** StatsD clients send metrics to a StatsD daemon over UDP. UDP is non-blocking and has no TCP handshake, so adding StatsD calls adds almost no overhead to application response times.
- **Metric types:**
  - **Counters** track how many times an event happens (for example, `statsd.incr('app.login.failures')`).
  - **Timers** record how long something takes. On every flush interval (10 seconds by default), StatsD aggregates the timer samples into several statistics, including the mean, count, lower and upper bounds, and the 90th percentile mean and sum.
  - **Gauges and sets** track point-in-time state values.

### Monitoring build and release pipelines

- **Deployment annotations.** Do not treat deployments as simple pass or fail events. Record deployment metadata (start and end timestamps, build commit hash, who deployed) in your metrics platform.
- **Correlating deploys with performance.** Overlay deployment markers on graphs such as HTTP 5xx error rate or API latency. It then becomes immediately visible when a release introduces a bug or slowdown.
- **Etsy's principle.** Etsy's "Measure Anything, Measure Everything" philosophy, applied to deploy timing next to system metrics, dramatically cuts troubleshooting time during outages.

### The `/health` endpoint pattern

- **The concept.** An HTTP endpoint (such as `/health` or `/status`) inside the application that exposes the app's operational state and the health of its dependencies.
- **Use cases.** It works as a health check target for load balancers (HAProxy) and service discovery systems (Consul, etcd), and gives a quick diagnostic check during deployments.
- **Multi-layered checks.** A simple check verifies a database query. Deeper checks verify Redis caches, message queues, and external APIs.
- **Implementation rules:**
  - Use correct HTTP status codes: 200 OK when healthy, 503 Service Unavailable when degraded or failing.
  - Return structured responses, detailed status as JSON key-value pairs rather than plain text.
  - Avoid over-engineering. Do not load the health check with too many deep, fragile dependencies, which creates noise and cascading false alarms.
  - Restrict access to internal monitoring IP addresses at the web server level.

### Application logging, and metrics vs. logs

- **Structured application logs.** Applications should emit structured JSON logs using language-specific libraries (structlog in Python, lograge in Rails, monolog in PHP).
- **Log entries vs. bare metrics.** One structured log entry with rich key-value metadata (for example `{'app_name': 'foo', 'login_latency_ms': 5, 'username': 'mjulian', 'success': false}`) tells you far more than a single isolated metric.
- **Write to disk, forward asynchronously.** Never write logs synchronously over the network from application code, because network latency will bottleneck the application. Write logs to a local file and let an asynchronous local logging daemon (rsyslog or a SaaS agent) ship the file over the network.
- **Log level pitfalls.** Relying on severity levels (DEBUG, INFO, ERROR) assumes systems are always working. When a tricky production bug appears, the details you need are often missing because log levels were set too high to save disk space.

### Serverless and microservice architectures (distributed tracing)

- **Serverless (FaaS) monitoring.** Function executions are short-lived, often under a second. Monitor them with StatsD and the metrics the vendor platform provides (invocations, duration, error rates).
- **Microservices hide latency.** In a distributed architecture, a user request passes through many backend hops, so inter-service latency bottlenecks are hard to see on aggregate graphs.
- **Distributed tracing.** Coming from Google's Dapper paper and tools like Zipkin and OpenTracing, distributed tracing tags every incoming request with a unique Request ID. That ID travels through every downstream RPC and HTTP API call, producing a full waterfall trace of the time spent in each service.
- **Implementation reality.** Distributed tracing is complex and resource-intensive. Unless inter-service latency across dozens of microservices is your main pain point, focus first on solid metrics and structured logging.

## Chapter 8: Server Monitoring

This chapter covers monitoring the individual servers and services that support your applications. Julian warns against relying too much on low-level OS metrics for alerting, but server metrics and logs are still essential for diagnosis and troubleshooting.

### Standard OS metrics: diagnostics over alerting

OS metrics (CPU, memory, network, disk, load) say little about whether the application is actually working. Collect them automatically on every server for troubleshooting, but do not alert on them unless you have a specific operational reason.

- **CPU usage.** Measured from `/proc/stat` (or with tools like `top`). Total CPU utilization is user (us) + system (sy) + niced processes (ni) + hardware and software interrupts (hi/si).
- **Memory.**
  - Know the difference between buffers (file system metadata) and caches (recently accessed file content).
  - To see real memory pressure, look at the used and free figures adjusted for buffers and cache (the second row of `free -m`).
  - Track swap usage, and alert on OOMKiller (Out-Of-Memory Killer) events in syslog. OOMKiller terminating processes means extreme and unpredictable memory exhaustion.
- **Disk performance.**
  - Key metrics from `/proc/diskstats` (via `iostat -x`): `iowait` (CPU idle time spent waiting on disk), `await` (average latency per I/O request, including queue time), and `%util` (disk saturation).
  - Track IOPS (transfers per second, tps). A sudden drop in IOPS on database or storage volumes often points to disk degradation.
- **System load.**
  - Load average is the number of processes waiting for CPU, over 1, 5, and 15 minutes.
  - High load does not necessarily mean degraded user performance. Treat it as a secondary proxy metric, not an alert trigger.

### SSL certificate monitoring

Monitor the expiration date of every internal and external SSL certificate to prevent sudden outages. Options:

- Registrar or Certificate Authority (CA) alerts, routed to ticketing systems and not to personal inboxes.
- External uptime monitoring tools for public-facing endpoints.
- Automated internal scripts or agent checks for internal services and wildcard certificates installed on multiple nodes.

### Stop using SNMP for servers

SNMP is an insecure, complex, pull-based protocol that needs a central poller and extra work to extend. Keep SNMP for network hardware where you are stuck with it, and use lightweight push-based agents like collectd, Telegraf, or Diamond for servers.

### Web server and load balancer metrics

- **Web server key metrics:**
  - **Requests per second:** the primary measure of throughput.
  - **HTTP response codes:** the volume and proportion of 200s vs. 4xx and 5xx errors.
  - **Request time:** turn on request duration logging in web server access logs (NGINX or Apache) to measure backend latency.
  - **Requests vs. connections:** focus on requests, because HTTP keepalives and persistent connections keep one TCP connection open across many requests.
- **Load balancers.**
  - Split metrics into frontend (client to load balancer) and backend (load balancer to app nodes) groups.
  - Configure HTTP health checks that hit the application's `/health` endpoint so failing backend nodes are removed automatically.

### Database servers, message queues, and caching

- **Databases (MySQL, PostgreSQL).**
  - Track queries per second (qps) as a direct indicator of database load.
  - Watch client connection limits (MySQL calls client connections "threads").
  - Log and parse slow queries to find unindexed or inefficient statements.
  - Track replication lag on read replicas, and watch storage volume IOPS.
- **Message queues (pub-sub).** Monitor queue length (unprocessed messages waiting) and consumption rate (messages processed per second) to spot worker bottlenecks.
- **Caching (Redis, Memcached).** Monitor the cache hit and miss ratio and the number of evicted items. A high eviction rate means the cache is too small and valid entries are being pushed out too early.

### DNS, NTP, and scheduled jobs

- **DNS.** Track queries per second and log slave zone transfers (AXFR/IXFR) to catch out-of-sync DNS slaves.
- **NTP time sync.** Monitor time drift between servers and NTP time sources. Inaccurate clocks cause subtle, severe bugs in distributed systems, authentication (Kerberos), and log timestamps.
- **Scheduled cron jobs: the dead man's switch pattern.** When a missing or failed job shows up as the absence of data, set up a check that alerts unless a state file is regularly updated by a successful run of the job.

### Server logging: collection, storage, and analysis

- **Collection.** Forward logs with syslog daemons or agent collectors.
- **TCP vs. UDP.** Use TCP forwarding with TLS encryption, so logs are encrypted in transit and messages are not dropped on the network.
- **Storage and analysis.** Do not leave logs in static text files on a single server where nobody reads them. Forward them to a central log management system, either SaaS or open source like the ELK stack.
- **High-value log events.** Focus log search and alerting on HTTP response codes, sudo usage, SSH login events, cron execution results, and database slow query logs.

## Chapter 9: Network Monitoring

The network is the foundation under every application and server. An application's availability can never be higher than the availability of its underlying network, so network observability is a key skill for systems and DevOps engineers.

### The mechanics and pains of SNMP

- **The reality of SNMP.** Network monitoring depends heavily on the Simple Network Management Protocol (SNMP), a legacy protocol first proposed in 1988 (RFC 1067) that network hardware vendors have been slow to replace.
- **Architecture and ports.** SNMP runs over UDP. Port 161 is used for inbound manager polling and port 162 for outbound device traps. It works between an agent (the daemon on the network device) and a manager (the client that sends queries).
- **OIDs vs. MIBs.**
  - **Object IDs (OIDs)** are hierarchical numerical paths for device data (for example `.1.3.6.1.2.1.1.1.0`).
  - **Management Information Base (MIB)** files are flat text files on the manager that translate numeric OIDs into readable names (such as `sysDescr.0`).
- **SNMP traps vs. syslog.** Traps are event notifications, but Julian recommends turning them off in favor of syslog, which carries the same event data and is much easier to manage.
- **Protocol versions:**
  - **Version 1:** plaintext community strings and 32-bit counters, which wrap around to zero within seconds on high-speed interfaces.
  - **Version 2c:** adds 64-bit counters and bulk requests, but keeps community strings.
  - **Version 3:** adds a user-based security model and packet encryption.
- **Security and testing.** Community strings travel over the network in plaintext, so keep SNMP on a dedicated management network. Core command-line testing tools are `snmpget` (fetch a single OID) and `snmpwalk` (list a whole table or tree).

### Essential interface metrics

Julian breaks link performance into five factors, with a highway metaphor for each:

- **Bandwidth:** the theoretical maximum capacity of a link, in bits per second (bps, Mbps, Gbps). It is the number of lanes on the highway. Server admins measure in bytes per second (Bps) while network engineers measure in bits per second (bps).
- **Throughput:** the actual observed traffic. Because of protocol overhead (Ethernet, IP, TCP), maximum TCP throughput tops out at about 95% of link bandwidth. Measure it with SNMP counters or testing tools like iperf2 and bwctl. It is the volume of vehicles actually moving down the highway.
- **Latency:** the time a packet needs to cross a link, limited by the speed of light. Monitor it continuously with tools like smokeping or iperf2. It is the physical length of the highway.
- **Errors:** Rx/Tx errors, drops, overruns, collisions, and CRC and carrier errors. CRC and carrier errors point to cabling that is degrading, electrical interference, or bad transceivers. Fiber links also need their light levels monitored. These are the crashes and traffic jams.
- **Jitter:** variation in latency over time. High jitter makes voice and video streams choppy. It is the unpredictability of travel time.

**Interface rule of thumb:** monitor and alert on uplinks, aggregated links, and server interfaces. Do not alert on noisy, flapping end-user access ports (desktops and laptops). Parse syslog for trunk port changes, err-disabled states, and link aggregation unbundling.

### Configuration tracking

- **The value of version control.** Unannounced network configuration changes are a leading cause of major outages.
- **Automate backups.** Use a tool like RANCID to log into devices with read-only accounts, pull the running configuration, commit it to a version control repository (like Git), and notify the team by email or chat whenever the configuration changes.

### Voice, video, and Quality of Service (QoS)

- **Sensitivity.** Real-time voice and video are extremely sensitive to latency, jitter, and packet loss.
- **Codec alignment.** Keep codec selection consistent across the network and verify codec settings via SNMP.
- **QoS and IP SLA.** Track QoS policy execution (for example with the Cisco Class-Based QoS MIB) to verify that bandwidth prioritization works. Use Cisco IP SLA to generate synthetic test traffic, report stream metrics via SNMP, and reroute traffic if link quality drops.

### Routing protocols, Spanning Tree, and chassis health

- **Routing protocols.**
  - **BGP:** monitor TCAM table memory usage to avoid crashes from TCAM exhaustion, and track BGP peer state changes, AS path changes, and shifts in prefix and community counts.
  - **OSPF:** track neighbor adjacency state changes in syslog and SNMP.
  - **First-hop redundancy:** track VRRP and HSRP active node transitions.
- **Spanning Tree Protocol (STP).** Alert on root bridge changes, which should be rare in a stable network, and track the rate of reconvergence events in your central log management system.
- **Chassis and hardware.** Graph CPU and memory utilization, but remember that some switches normally run at 100% CPU with no performance impact. Monitor individual line card CPUs, supervisor cards, switch stacks, and power supplies, and alert immediately on "cold start" reboot messages in syslog.

### Flow monitoring and capacity planning

- **Flow monitoring.** Analyzes one-way sequences of packets that share 7 attributes (ingress interface, source IP, destination IP, IP protocol, source port, destination port, Type of Service).
- **Implementations.** NetFlow (Cisco), sFlow (sampled flow), J-Flow (Juniper), and IPFIX (the open standard).
- **Use case.** Visibility into top bandwidth talkers, protocol distribution, and network usage per application.
- **Capacity planning methods.**
  - **Working backward:** calculate the link capacity you need directly from hard business requirements.
  - **Forecasting:** export 6 or more months of historical interface metrics and plot trend lines (Excel, rrdtool, or Graphite) to schedule hardware and link upgrades ahead of time.

## Chapter 10: Security Monitoring

Unlike infrastructure or application monitoring, where systems naturally emit operational data, security monitoring often has to be bolted on after the fact, because applications and systems were rarely designed with security in mind.

### Security risk and compliance monitoring

- **The security continuum.** Security is a balance between threat and risk. It makes no sense to spend 1,000 dollars to protect against losing 100. Security controls should be chosen deliberately based on real risk, not blindly adopted or dismissed as too hard.
- **Monitoring as proof of compliance.** Regulations like PCI-DSS, HIPAA, SOX, and SOC2 require organizations to show that their security controls are actually working.
  - PCI-DSS 1.3.5: prove that only "established" connections enter the network by monitoring connection types at the edge firewall.
  - PCI-DSS 5.2: prove anti-virus compliance by aggregating audit logs and verifying that periodic scans start and finish.
  - HIPAA: meet the audit control requirements by logging all system activity that involves protected health information.

### User, command, and filesystem auditing with auditd

- **Kernel-level auditing.** `auditd` is a Linux user-space interface that hooks directly into the kernel to log security events. Because it works independently of subsystems like syslog, it keeps capturing events even if syslog is broken or disabled.
- **High-value audit rules:**
  - Track all sudo executions, the exact commands run, and the user identities.
  - Watch sensitive files for write and append operations (for example `-w /etc/myconfig.conf -p wa -k myconfig_changes`).
  - Record user authentication attempts and failures.
- **Remote log forwarding.** Use the `audisp-remote` plugin to forward auditd logs to a central log server immediately. Forwarding this way, instead of through rsyslog, stops a malicious user who disables rsyslog from hiding the audit trail.
- **Alert triggers.** Centralize audit logs and alert on successful SSH logins and on both failed and successful sudo attempts.

### Host intrusion detection systems (HIDS) and rkhunter

- **Detecting host compromise.** A Host Intrusion Detection System finds malicious actors or stealthy changes on an individual host, such as webshells, rootkits, or altered system binaries.
- **Rootkit Hunter (rkhunter).** It compares file hashes against known-good baselines, detects known rootkits by signature, and checks security configuration (for example, whether root SSH login is allowed).
- **Automated cron workflow.** Run rkhunter from cron with the flags `--cronjob --update --quiet`, so the signature databases are updated before each run.
- **Alerting.** Forward `/var/log/rkhunter.log` to central log storage and alert whenever a log line contains the `Warning` prefix. Set up a dead man's switch alert in case rkhunter fails to run on schedule.
- **A more robust option.** Julian recommends OSSEC for teams that need a stronger HIDS.

### Network intrusion detection systems (NIDS) and taps

- **Assume breaches happen.** Firewalls prevent attacks at the perimeter. A Network Intrusion Detection System listens to raw network traffic to detect intrusions after a breach has happened.
- **Hardware taps vs. SPAN ports.**
  - Use inline hardware network taps at strategic choke points and demarcation points. A tap should fail open, so that if it loses power, traffic keeps flowing through it like a simple coupler and the link is not cut.
  - Avoid relying only on switch SPAN (port mirroring) ports, because heavy network traffic easily overwhelms a mirror port and packets get dropped.
- **SIEM integration.** Send the tapped traffic into a Security Information and Event Management (SIEM) tool or analysis engine (such as Bro or Snort) for deep packet inspection and log correlation.

## My review: 4/5

I rate Practical Monitoring 4 out of 5 stars.

### Pros

- **It gives you structure.** The book is a foundation and a template to start from. You do not have to invent your monitoring approach from zero.
- **It is full of real experience.** You can feel that the author put his years of experience into this book. It is a summary of those years, and it sets good standards to follow.
- **It is beginner friendly.** The ideas are explained clearly and practically.

### Cons

- **Beginner friendly, but not in every chapter.** It depends on who is reading. The book covers monitoring across security, frontend, backend, network, and more, and it even covers how to manage an on-call team. A beginner will not have all of that background at once, so some chapters will feel much harder than others.
- **Some of the tools are old.** Several tools the author mentions are dated, and newer tools are not covered. That is expected, because the book is from 2017.

### Final thoughts

Even with those cons, I think this is a fantastic book. I really hope a second edition is coming that covers AI, AI agents, and the new tools like OpenTelemetry.
