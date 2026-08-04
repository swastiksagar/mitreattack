export interface Technique {
  id: string;
  name: string;
  summary: string;
  detection: string;
}

export interface Tactic {
  id: string;
  slug: string;
  name: string;
  order: number;
  objective: string;
  description: string;
  whyItMatters: string;
  techniques: Technique[];
}

export const TACTICS: Tactic[] = [
  {
    id: "TA0043",
    slug: "reconnaissance",
    name: "Reconnaissance",
    order: 1,
    objective: "Gather information to plan the operation.",
    description:
      "Everything an adversary does before touching your perimeter. Scraping employee names off LinkedIn, resolving your subdomains, pulling certificate transparency logs, fingerprinting the edge devices you forgot were internet-facing. Most of it happens on infrastructure you do not own and cannot log.",
    whyItMatters:
      "You will rarely alert on reconnaissance, but it explains the shape of what comes next. When a phish lands addressed to the four people who actually approve wire transfers, that targeting came from somewhere.",
    techniques: [
      {
        id: "T1595",
        name: "Active Scanning",
        summary:
          "Port scans, vulnerability scans, and wordlist-driven directory brute forcing against hosts the target owns.",
        detection:
          "Edge firewall denies from a single source across many ports; 404 floods in web server logs with scanner user-agents.",
      },
      {
        id: "T1592",
        name: "Gather Victim Host Information",
        summary:
          "Collecting hardware, software, and configuration details about hosts through banners, headers, and public documents.",
        detection:
          "Low signal. Reduce exposure instead: strip version banners, trim verbose error pages, scrub document metadata.",
      },
      {
        id: "T1589",
        name: "Gather Victim Identity Information",
        summary:
          "Harvesting employee names, email formats, and credentials from breach dumps and social platforms.",
        detection:
          "Monitor credential-leak feeds for corporate domains; watch for authentication attempts against accounts that never existed.",
      },
      {
        id: "T1596",
        name: "Search Open Technical Databases",
        summary:
          "Shodan, Censys, certificate transparency, WHOIS, and DNS records used to map external attack surface.",
        detection:
          "Run the same queries yourself on a schedule. Anything you find, they already found.",
      },
      {
        id: "T1598",
        name: "Phishing for Information",
        summary:
          "Messages designed to elicit information rather than deliver a payload — vendor verification, IT survey, HR pretext.",
        detection:
          "User reports; mail gateway rules for newly registered lookalike domains and reply-to mismatches.",
      },
    ],
  },
  {
    id: "TA0042",
    slug: "resource-development",
    name: "Resource Development",
    order: 2,
    objective: "Build, buy, or steal the infrastructure used in the operation.",
    description:
      "Registering domains, standing up command-and-control servers, buying access from an initial access broker, signing malware with a stolen certificate. Preparation carried out entirely on adversary-controlled ground.",
    whyItMatters:
      "Infrastructure gets reused. A domain registered two days before it appears in your proxy logs is one of the highest-fidelity cheap signals you have.",
    techniques: [
      {
        id: "T1583",
        name: "Acquire Infrastructure",
        summary:
          "Domains, VPS instances, botnets, web services, and serverless functions purchased for the operation.",
        detection:
          "Proxy alerting on newly observed domains (< 30 days registered); traffic to low-reputation hosting ASNs.",
      },
      {
        id: "T1586",
        name: "Compromise Accounts",
        summary:
          "Taking over legitimate email or social accounts so that later phishing arrives from a trusted sender.",
        detection:
          "Inbound mail passing SPF/DKIM from a real partner domain but with anomalous language or an unexpected attachment.",
      },
      {
        id: "T1587",
        name: "Develop Capabilities",
        summary:
          "Building malware, exploits, and code-signing certificates in-house rather than buying them.",
        detection:
          "Not detectable at the victim. Consume threat intelligence and hunt the resulting hashes and TTPs.",
      },
      {
        id: "T1588",
        name: "Obtain Capabilities",
        summary:
          "Purchasing tooling, exploits, certificates, or already-established access to your network.",
        detection:
          "Dark-web and broker monitoring for your own domain and VPN ranges appearing for sale.",
      },
    ],
  },
  {
    id: "TA0001",
    slug: "initial-access",
    name: "Initial Access",
    order: 3,
    objective: "Get the first foothold inside the environment.",
    description:
      "The point where the adversary crosses from outside to inside. In practice this is overwhelmingly three things: a phish someone clicked, a credential that worked because it was reused and unprotected by MFA, or an internet-facing application that had not been patched.",
    whyItMatters:
      "This is the tactic where a Tier 1 analyst most often earns their salary. Catching the intrusion here is the difference between a two-hour incident and a two-week one.",
    techniques: [
      {
        id: "T1566",
        name: "Phishing",
        summary:
          "Attachments, links, or service-based delivery aimed at getting execution or credentials from a user.",
        detection:
          "Mail gateway detonation verdicts, user-reported phish queue, first-time-seen sender plus attachment execution on the endpoint.",
      },
      {
        id: "T1190",
        name: "Exploit Public-Facing Application",
        summary:
          "Abusing a vulnerability in an internet-exposed web app, VPN appliance, or file transfer product.",
        detection:
          "WAF blocks followed by a 200; a web server process spawning a shell (w3wp.exe or httpd launching cmd.exe / bash).",
      },
      {
        id: "T1078",
        name: "Valid Accounts",
        summary:
          "Logging in with legitimate stolen credentials — the quietest way in and the hardest to distinguish from normal work.",
        detection:
          "Impossible travel, first-time ASN or country for the user, MFA fatigue patterns, logins outside the user's baseline hours.",
      },
      {
        id: "T1133",
        name: "External Remote Services",
        summary:
          "VPN, RDP gateways, Citrix, and VDI accessed directly with valid or brute-forced credentials.",
        detection:
          "VPN logins from residential proxy or VPS ranges; RDP exposed to the internet at all is a finding on its own.",
      },
      {
        id: "T1195",
        name: "Supply Chain Compromise",
        summary:
          "Trojanised software updates, poisoned dependencies, or compromised managed service providers.",
        detection:
          "Baseline what your update processes normally do, then alert when a signed updater deviates — new child processes, new destinations.",
      },
    ],
  },
  {
    id: "TA0002",
    slug: "execution",
    name: "Execution",
    order: 4,
    objective: "Run adversary-controlled code on a local or remote system.",
    description:
      "Access without execution is a locked door with a key in it. Execution is turning that key: an interpreter runs, a script fires, a scheduled task detonates. Almost always paired with the tactic that got them in and the one that keeps them there.",
    whyItMatters:
      "Process-creation telemetry is the richest data source in the SOC. Nearly every execution technique shows up as a parent-child relationship that either makes sense or very much does not.",
    techniques: [
      {
        id: "T1059",
        name: "Command and Scripting Interpreter",
        summary:
          "PowerShell, cmd, bash, Python, JavaScript, and Visual Basic used to run adversary commands.",
        detection:
          "Encoded PowerShell (-enc, -w hidden), Office applications spawning interpreters, script block logging (Event ID 4104).",
      },
      {
        id: "T1204",
        name: "User Execution",
        summary:
          "The user opens the attachment, mounts the ISO, runs the installer, or pastes the ClickFix command.",
        detection:
          "Process trees rooted in a mail client or browser download directory; execution from temp, Downloads, or a mounted image.",
      },
      {
        id: "T1053",
        name: "Scheduled Task/Job",
        summary:
          "schtasks, cron, at, and systemd timers used both to execute now and to survive a reboot.",
        detection:
          "Event ID 4698 (task created); new cron entries; tasks whose action points at a user-writable path.",
      },
      {
        id: "T1047",
        name: "Windows Management Instrumentation",
        summary:
          "WMI used to execute commands locally or on remote hosts without dropping a new binary.",
        detection:
          "WmiPrvSE.exe as a parent of cmd or powershell; WMI event subscriptions created outside change windows.",
      },
      {
        id: "T1569",
        name: "System Services",
        summary:
          "Creating or abusing services (including PsExec-style service installs) to execute payloads as SYSTEM.",
        detection:
          "Event ID 7045 (service installed) with a random-looking service name or a binary path in ADMIN$.",
      },
    ],
  },
  {
    id: "TA0003",
    slug: "persistence",
    name: "Persistence",
    order: 5,
    objective: "Keep access across reboots, credential changes, and cleanups.",
    description:
      "The adversary assumes you will eventually reboot the box, reset the password, or kill the process. Persistence is the insurance policy: a run key, a new local account, an OAuth application consent, a web shell in a directory nobody audits.",
    whyItMatters:
      "Missed persistence is how an incident reopens a week after you closed it. Eradication is not complete until every persistence mechanism is enumerated, not just the one that alerted.",
    techniques: [
      {
        id: "T1547",
        name: "Boot or Logon Autostart Execution",
        summary:
          "Run keys, startup folders, Winlogon helpers, and LSA drivers that execute on boot or logon.",
        detection:
          "Registry writes to Run/RunOnce by non-installer processes; new files in Startup folders.",
      },
      {
        id: "T1136",
        name: "Create Account",
        summary:
          "New local, domain, or cloud accounts created to provide a durable second way in.",
        detection:
          "Event ID 4720 (account created) and 4732 (added to privileged group), especially outside business hours.",
      },
      {
        id: "T1505",
        name: "Server Software Component",
        summary:
          "Web shells, IIS modules, and SQL stored procedures planted inside legitimate server software.",
        detection:
          "New .aspx/.php files in web roots; web server processes spawning shells; file integrity monitoring on web directories.",
      },
      {
        id: "T1098",
        name: "Account Manipulation",
        summary:
          "Adding credentials to an existing account — SSH keys, app registrations, additional MFA devices.",
        detection:
          "New MFA method registered immediately after a suspicious sign-in; new service principal credentials in cloud audit logs.",
      },
      {
        id: "T1543",
        name: "Create or Modify System Process",
        summary:
          "Windows services, launch daemons, and systemd units created or hijacked for persistence.",
        detection:
          "Event ID 7045; new unit files in /etc/systemd/system; service binaries in unusual paths.",
      },
    ],
  },
  {
    id: "TA0004",
    slug: "privilege-escalation",
    name: "Privilege Escalation",
    order: 6,
    objective: "Obtain higher-level permissions than the initial foothold.",
    description:
      "A standard user account cannot dump LSASS or disable the EDR agent. Escalation closes that gap — through an unquoted service path, a token theft, a sudo misconfiguration, or a domain privilege the account should never have held.",
    whyItMatters:
      "Escalation is the hinge of the intrusion. Before it, the blast radius is one user. After it, it is the domain.",
    techniques: [
      {
        id: "T1068",
        name: "Exploitation for Privilege Escalation",
        summary:
          "Kernel and driver vulnerabilities, including bring-your-own-vulnerable-driver, used to reach SYSTEM or root.",
        detection:
          "Unsigned or known-vulnerable driver loads; process integrity level jumping without a legitimate elevation path.",
      },
      {
        id: "T1548",
        name: "Abuse Elevation Control Mechanism",
        summary:
          "UAC bypasses, sudo abuse, setuid binaries, and elevated COM interfaces.",
        detection:
          "fodhelper.exe / computerdefaults.exe registry hijacks; sudo invocations by service accounts.",
      },
      {
        id: "T1134",
        name: "Access Token Manipulation",
        summary:
          "Stealing or impersonating another process's token to inherit its privileges.",
        detection:
          "Process access with high-privilege rights (0x1410) against SYSTEM processes; SeDebugPrivilege use by unexpected binaries.",
      },
      {
        id: "T1055",
        name: "Process Injection",
        summary:
          "Writing code into another live process to run under its identity and evade process-based controls.",
        detection:
          "CreateRemoteThread and cross-process memory writes; RWX memory regions with no backing file on disk.",
      },
      {
        id: "T1484",
        name: "Domain or Tenant Policy Modification",
        summary:
          "Group Policy and tenant-level trust changes that grant the adversary durable elevated rights.",
        detection:
          "GPO modifications outside change windows; new federated trust or domain added to the tenant.",
      },
    ],
  },
  {
    id: "TA0005",
    slug: "defense-evasion",
    name: "Defense Evasion",
    order: 7,
    objective: "Avoid being detected or blocked throughout the operation.",
    description:
      "The tactic with the most techniques, because it accompanies every other one. Clearing logs, disabling agents, signing payloads, hiding in trusted binaries, blending timing into business hours.",
    whyItMatters:
      "Absence of telemetry is telemetry. An endpoint that suddenly stops reporting, a log that suddenly clears, a security service that suddenly stops — treat each as an alert, not as a data-quality problem.",
    techniques: [
      {
        id: "T1562",
        name: "Impair Defenses",
        summary:
          "Disabling EDR, AV, firewall rules, or logging to blind the defenders before the noisy work begins.",
        detection:
          "Event ID 1102 (audit log cleared), 104 (log cleared), Defender tamper alerts, agent heartbeat gaps.",
      },
      {
        id: "T1070",
        name: "Indicator Removal",
        summary:
          "Deleting logs, files, and shell history, and timestomping artefacts to break timeline reconstruction.",
        detection:
          "wevtutil cl, `history -c`, mass file deletion in temp; MFT timestamps that disagree with $FILE_NAME.",
      },
      {
        id: "T1218",
        name: "System Binary Proxy Execution",
        summary:
          "Living-off-the-land binaries (rundll32, mshta, regsvr32, msiexec) executing payloads under trusted names.",
        detection:
          "LOLBins with network connections or unusual command lines; check the LOLBAS project for expected arguments.",
      },
      {
        id: "T1027",
        name: "Obfuscated Files or Information",
        summary:
          "Base64, packing, encryption, and steganography that keep payloads unreadable to static inspection.",
        detection:
          "High-entropy command lines, long encoded blobs in script block logs, packed binaries with tiny import tables.",
      },
      {
        id: "T1036",
        name: "Masquerading",
        summary:
          "Naming malware svchost.exe, planting it outside System32, or using right-to-left override in filenames.",
        detection:
          "Known system binary names running from non-system paths; signature mismatches against the expected publisher.",
      },
    ],
  },
  {
    id: "TA0006",
    slug: "credential-access",
    name: "Credential Access",
    order: 8,
    objective: "Steal account names, passwords, hashes, and tokens.",
    description:
      "Stolen credentials turn intrusion into administration. LSASS memory, the NTDS.dit file, browser password stores, cloud tokens on disk, and the Kerberos tickets sitting in memory on every host the adversary touches.",
    whyItMatters:
      "Credential theft is the pivot point between one compromised host and enterprise-wide access. It is also one of the most reliably detectable tactics if you instrument LSASS access and Kerberos ticket requests.",
    techniques: [
      {
        id: "T1003",
        name: "OS Credential Dumping",
        summary:
          "Mimikatz, comsvcs.dll, procdump, and NTDS extraction pulling hashes and plaintext from memory or disk.",
        detection:
          "Sysmon Event ID 10 — process access to lsass.exe with 0x1010/0x1410; volume shadow copy creation on a domain controller.",
      },
      {
        id: "T1110",
        name: "Brute Force",
        summary:
          "Password spraying, credential stuffing, and password guessing against exposed authentication surfaces.",
        detection:
          "Event ID 4625 across many accounts from one source (spray) or many sources for one account; cloud sign-in failure spikes.",
      },
      {
        id: "T1558",
        name: "Steal or Forge Kerberos Tickets",
        summary:
          "Kerberoasting, AS-REP roasting, golden and silver tickets abusing Kerberos design.",
        detection:
          "Event ID 4769 with RC4 encryption (0x17) for many SPNs from one account; TGTs with implausible lifetimes.",
      },
      {
        id: "T1555",
        name: "Credentials from Password Stores",
        summary:
          "Browser saved passwords, keychains, and password manager databases harvested from disk.",
        detection:
          "Non-browser processes reading Login Data or logins.json; access to .kdbx and keychain files by new binaries.",
      },
      {
        id: "T1528",
        name: "Steal Application Access Token",
        summary:
          "OAuth tokens and cloud session cookies stolen to bypass MFA entirely.",
        detection:
          "Same session token used from two ASNs; illicit consent grants to newly registered applications.",
      },
    ],
  },
  {
    id: "TA0007",
    slug: "discovery",
    name: "Discovery",
    order: 9,
    objective: "Learn the internal environment after gaining access.",
    description:
      "The adversary landed somewhere they have never been. Discovery is the orientation phase: who am I, what domain is this, who else is logged on, where are the shares, what is running, what is blocking me.",
    whyItMatters:
      "Discovery is noisy and fast. A user account running whoami, net group, nltest, and systeminfo within sixty seconds is not doing their job — that is a hands-on-keyboard sequence and one of the best Tier 1 catches available.",
    techniques: [
      {
        id: "T1087",
        name: "Account Discovery",
        summary:
          "Enumerating local, domain, and cloud accounts to find privileged targets.",
        detection:
          "net user /domain, net group \"Domain Admins\", Get-ADUser bursts from non-admin workstations.",
      },
      {
        id: "T1018",
        name: "Remote System Discovery",
        summary:
          "Finding other hosts by IP, hostname, or Active Directory to plan lateral movement.",
        detection:
          "Sequential SMB or ICMP connections to many internal hosts from one workstation in a short window.",
      },
      {
        id: "T1482",
        name: "Domain Trust Discovery",
        summary:
          "Mapping trust relationships to find paths into other domains and forests.",
        detection:
          "nltest /domain_trusts, Get-DomainTrust, and BloodHound collector activity (SharpHound signatures).",
      },
      {
        id: "T1057",
        name: "Process Discovery",
        summary:
          "Listing running processes, usually to identify security tooling before disabling it.",
        detection:
          "tasklist and ps output followed quickly by attempts to stop security services.",
      },
      {
        id: "T1069",
        name: "Permission Groups Discovery",
        summary:
          "Enumerating group membership to identify who holds the keys to the domain or the tenant.",
        detection:
          "Repeated LDAP queries for privileged group membership from a single non-administrative host.",
      },
    ],
  },
  {
    id: "TA0008",
    slug: "lateral-movement",
    name: "Lateral Movement",
    order: 10,
    objective: "Move from the foothold to the systems that actually matter.",
    description:
      "The first machine is rarely the target. Lateral movement is the walk from a marketing laptop to the file server, the domain controller, or the backup infrastructure — usually using the same remote administration tools your own IT team relies on.",
    whyItMatters:
      "Because it reuses admin tooling, lateral movement is defined by context rather than by the tool. RDP from an admin jump box is normal. The same RDP from a receptionist's laptop at 02:00 is the incident.",
    techniques: [
      {
        id: "T1021",
        name: "Remote Services",
        summary:
          "RDP, SMB admin shares, WinRM, SSH, and VNC used with valid credentials to reach new hosts.",
        detection:
          "Event ID 4624 Type 3 and Type 10 from unusual source workstations; new admin share access patterns.",
      },
      {
        id: "T1550",
        name: "Use Alternate Authentication Material",
        summary:
          "Pass-the-hash, pass-the-ticket, and stolen web session cookies authenticating without the password.",
        detection:
          "NTLM logons where Kerberos is expected; a logon with no preceding interactive credential entry.",
      },
      {
        id: "T1570",
        name: "Lateral Tool Transfer",
        summary:
          "Copying tooling between internal hosts over SMB or a remote management channel.",
        detection:
          "Executables written to C$ or ADMIN$ followed within seconds by a service creation on the same host.",
      },
      {
        id: "T1080",
        name: "Taint Shared Content",
        summary:
          "Planting malicious files or shortcuts on network shares so other users execute them.",
        detection:
          "New executables and .lnk files on shares, followed by execution from a UNC path on multiple hosts.",
      },
      {
        id: "T1563",
        name: "Remote Service Session Hijacking",
        summary:
          "Taking over an existing RDP or SSH session that is already authenticated.",
        detection:
          "tscon.exe use; a session reconnecting from a different source address mid-session.",
      },
    ],
  },
  {
    id: "TA0009",
    slug: "collection",
    name: "Collection",
    order: 11,
    objective: "Gather the data the operation exists to obtain.",
    description:
      "Staging before theft. Files pulled from shares and mailboxes into a single archive, keystrokes captured, screenshots taken, databases dumped — usually compressed into one password-protected archive in a temp directory.",
    whyItMatters:
      "Collection is the last quiet moment before exfiltration. A large RAR appearing in C:\\Windows\\Temp is a gift: you still have time to act before the data leaves.",
    techniques: [
      {
        id: "T1005",
        name: "Data from Local System",
        summary:
          "Files, configs, and credentials harvested from the compromised host itself.",
        detection:
          "Mass file reads by a single non-indexing process; recursive directory traversal in command lines.",
      },
      {
        id: "T1039",
        name: "Data from Network Shared Drive",
        summary:
          "Bulk reads from file servers and departmental shares.",
        detection:
          "One account opening thousands of files across shares in minutes; file server audit spikes.",
      },
      {
        id: "T1560",
        name: "Archive Collected Data",
        summary:
          "Compressing and encrypting the staged data to shrink it and hide its contents.",
        detection:
          "rar.exe / 7z.exe with a password flag; large archives written to temp or ProgramData.",
      },
      {
        id: "T1114",
        name: "Email Collection",
        summary:
          "Mailbox exports, forwarding rules, and delegated access used to siphon correspondence.",
        detection:
          "New inbox rules forwarding externally; New-MailboxExportRequest in Exchange audit logs.",
      },
      {
        id: "T1056",
        name: "Input Capture",
        summary:
          "Keyloggers and credential-prompt spoofing capturing what the user types.",
        detection:
          "SetWindowsHookEx usage; unexpected processes registering raw input devices.",
      },
    ],
  },
  {
    id: "TA0011",
    slug: "command-and-control",
    name: "Command and Control",
    order: 12,
    objective: "Communicate with compromised systems to control them.",
    description:
      "The channel back out. Modern C2 hides inside things you cannot block: HTTPS to a CDN, DNS queries, a Slack webhook, a legitimate remote monitoring agent installed to look like IT tooling.",
    whyItMatters:
      "C2 is the most durable detection opportunity because the channel must persist for the operation to continue. Beacon jitter, JA3 fingerprints, and consistent small-payload intervals all survive payload changes.",
    techniques: [
      {
        id: "T1071",
        name: "Application Layer Protocol",
        summary:
          "HTTP, HTTPS, DNS, and mail protocols carrying command traffic inside ordinary-looking sessions.",
        detection:
          "Beaconing intervals with low jitter, uniform payload sizes, long-lived connections to rare destinations.",
      },
      {
        id: "T1573",
        name: "Encrypted Channel",
        summary:
          "TLS or custom crypto wrapping the C2 channel so content inspection sees nothing.",
        detection:
          "JA3/JA3S fingerprints, self-signed certificates, TLS to IP addresses with no SNI.",
      },
      {
        id: "T1105",
        name: "Ingress Tool Transfer",
        summary:
          "Pulling additional tooling into the environment after the initial payload lands.",
        detection:
          "certutil -urlcache, bitsadmin, curl, and PowerShell downloads writing executables to disk.",
      },
      {
        id: "T1219",
        name: "Remote Access Software",
        summary:
          "AnyDesk, TeamViewer, ScreenConnect, and similar tools installed by the adversary as their C2.",
        detection:
          "RMM binaries on hosts outside IT's approved inventory; traffic to RMM vendor domains from unmanaged endpoints.",
      },
      {
        id: "T1090",
        name: "Proxy",
        summary:
          "Multi-hop proxies, Tor, and domain fronting used to hide the true C2 destination.",
        detection:
          "Tor entry-node connections; internal hosts acting as relays for other internal hosts.",
      },
    ],
  },
  {
    id: "TA0010",
    slug: "exfiltration",
    name: "Exfiltration",
    order: 13,
    objective: "Move the collected data out of the network.",
    description:
      "The data leaves — over the existing C2 channel, to a cloud storage account, onto a USB device, or through a legitimate file transfer service that your users also use every day for real work.",
    whyItMatters:
      "Exfiltration is the point at which a security incident becomes a breach with legal reporting obligations. Egress volume baselines per host are cheap and catch most of it.",
    techniques: [
      {
        id: "T1041",
        name: "Exfiltration Over C2 Channel",
        summary:
          "Data sent out through the same channel already used for control.",
        detection:
          "Upload volume far exceeding download on a long-lived session; sustained outbound to a single rare host.",
      },
      {
        id: "T1567",
        name: "Exfiltration Over Web Service",
        summary:
          "Dropbox, Google Drive, Mega, Discord, and pastebin-style services used as drop points.",
        detection:
          "Large uploads to personal cloud storage from servers; DLP policies on unsanctioned storage domains.",
      },
      {
        id: "T1048",
        name: "Exfiltration Over Alternative Protocol",
        summary:
          "DNS tunnelling, FTP, and ICMP used to carry data around web-focused controls.",
        detection:
          "Abnormal DNS TXT query volume and length; internal hosts sending FTP outbound at all.",
      },
      {
        id: "T1052",
        name: "Exfiltration Over Physical Medium",
        summary:
          "USB drives and other removable media used where the network is monitored.",
        detection:
          "Removable device insertion events (Event ID 6416) followed by bulk file copies.",
      },
      {
        id: "T1029",
        name: "Scheduled Transfer",
        summary:
          "Exfiltration timed to blend into backup windows or normal business traffic patterns.",
        detection:
          "Recurring outbound transfers at fixed offsets; egress that continues on weekends when users are absent.",
      },
    ],
  },
  {
    id: "TA0040",
    slug: "impact",
    name: "Impact",
    order: 14,
    objective: "Manipulate, interrupt, or destroy systems and data.",
    description:
      "The visible end. Ransomware encryption, wipers, backup deletion, account lockouts, defacement, denial of service. By the time impact fires, every earlier tactic has already succeeded.",
    whyItMatters:
      "You do not detect ransomware at encryption time — you contain it. Every alert you catch in the twelve tactics above this one is an opportunity to never reach this row.",
    techniques: [
      {
        id: "T1486",
        name: "Data Encrypted for Impact",
        summary:
          "Ransomware encrypting files across endpoints and servers to force payment.",
        detection:
          "Mass file rename/write bursts, ransom note creation, canary file modification.",
      },
      {
        id: "T1490",
        name: "Inhibit System Recovery",
        summary:
          "Deleting shadow copies, disabling recovery mode, and destroying backups before encrypting.",
        detection:
          "vssadmin delete shadows, wbadmin delete catalog, bcdedit recovery flags — treat every one as critical.",
      },
      {
        id: "T1485",
        name: "Data Destruction",
        summary:
          "Wipers and secure-delete operations that destroy data with no intent of recovery.",
        detection:
          "Raw disk writes by unexpected processes; SDelete-style patterns across many hosts at once.",
      },
      {
        id: "T1489",
        name: "Service Stop",
        summary:
          "Stopping databases, backup agents, and security services so files can be encrypted cleanly.",
        detection:
          "net stop / sc stop against database and backup services in rapid sequence.",
      },
      {
        id: "T1498",
        name: "Network Denial of Service",
        summary:
          "Flooding the network or an application to make it unavailable, sometimes as a distraction.",
        detection:
          "Bandwidth saturation, connection-table exhaustion, upstream provider alerts.",
      },
    ],
  },
];

export const TACTIC_COUNT = TACTICS.length;
export const TECHNIQUE_COUNT = TACTICS.reduce((n, t) => n + t.techniques.length, 0);

export function getTactic(slug: string): Tactic | undefined {
  return TACTICS.find((t) => t.slug === slug);
}
