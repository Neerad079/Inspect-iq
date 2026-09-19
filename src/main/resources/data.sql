-- ============================================================
-- SmartInspect AI - Demo Seed Data
-- ============================================================

-- ============================================
-- USERS (password: password123 = BCrypt hash)
-- ============================================
-- BCrypt hash for 'password123': $2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG

INSERT IGNORE INTO users (id, name, email, password, role, created_at) VALUES
(1, 'Admin User', 'admin@smartinspect.com', '$2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG', 'ADMIN', NOW()),
(2, 'Officer Rajesh Kumar', 'rajesh.kumar@smartinspect.com', '$2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG', 'INSPECTOR', NOW()),
(3, 'Officer Priya Sharma', 'priya.sharma@smartinspect.com', '$2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG', 'INSPECTOR', NOW()),
(4, 'Officer Amit Patel', 'amit.patel@smartinspect.com', '$2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG', 'INSPECTOR', NOW()),
(5, 'Officer Sneha Reddy', 'sneha.reddy@smartinspect.com', '$2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG', 'INSPECTOR', NOW()),
(6, 'Officer Vikram Singh', 'vikram.singh@smartinspect.com', '$2a$10$Nwu4kM2Vj/fAQ6vzkiIhs.Y2Lw0Hrr.d.EFqA8NP45vqJQJmUEeVG', 'INSPECTOR', NOW());

-- ============================================
-- INSPECTORS
-- ============================================
INSERT IGNORE INTO inspectors (id, user_id, name, email, phone, availability, current_workload) VALUES
(1, 2, 'Officer Rajesh Kumar', 'rajesh.kumar@smartinspect.com', '9876543210', true, 1),
(2, 3, 'Officer Priya Sharma', 'priya.sharma@smartinspect.com', '9876543211', true, 0),
(3, 4, 'Officer Amit Patel', 'amit.patel@smartinspect.com', '9876543212', true, 2),
(4, 5, 'Officer Sneha Reddy', 'sneha.reddy@smartinspect.com', '9876543213', true, 0),
(5, 6, 'Officer Vikram Singh', 'vikram.singh@smartinspect.com', '9876543214', false, 3);

-- ============================================
-- INSTITUTIONS (15 demo institutions)
-- ============================================
INSERT IGNORE INTO institutions (id, name, address, latitude, longitude, capacity, staff_count, beneficiary_count, status, created_at, updated_at) VALUES
(1,  'Delhi Public School - Dwarka',         'Sector 12, Dwarka, New Delhi',           28.5921, 77.0460, 1200, 85,  1100, 'ACTIVE',   NOW(), NOW()),
(2,  'Kendriya Vidyalaya - Chandigarh',      'Sector 31, Chandigarh',                  30.7333, 76.7794, 800,  55,  720,  'ACTIVE',   NOW(), NOW()),
(3,  'Government ITI - Pune',                'Hadapsar, Pune, Maharashtra',            18.5089, 73.9260, 500,  35,  450,  'ACTIVE',   NOW(), NOW()),
(4,  'Navodaya Vidyalaya - Jaipur',          'Mansarovar, Jaipur, Rajasthan',          26.8484, 75.7642, 600,  42,  560,  'ACTIVE',   NOW(), NOW()),
(5,  'Central University - Hyderabad',       'Gachibowli, Hyderabad, Telangana',       17.4435, 78.3772, 2000, 180, 1800, 'ACTIVE',   NOW(), NOW()),
(6,  'IIIT - Bangalore',                     'Electronic City, Bangalore, Karnataka',  12.8440, 77.6630, 1500, 120, 1350, 'ACTIVE',   NOW(), NOW()),
(7,  'Government Girls School - Lucknow',    'Hazratganj, Lucknow, UP',               26.8500, 80.9500, 400,  28,  360,  'ACTIVE',   NOW(), NOW()),
(8,  'Model School - Bhopal',                'MP Nagar, Bhopal, MP',                   23.2332, 77.4345, 700,  48,  650,  'ACTIVE',   NOW(), NOW()),
(9,  'Sainik School - Kochi',                'Naval Base, Kochi, Kerala',              9.9312,  76.2673, 350,  30,  300,  'ACTIVE',   NOW(), NOW()),
(10, 'Government Polytechnic - Nagpur',      'Civil Lines, Nagpur, Maharashtra',       21.1458, 79.0882, 900,  65,  820,  'ACTIVE',   NOW(), NOW()),
(11, 'District Institute of Education - Patna', 'Boring Road, Patna, Bihar',           25.6093, 85.1376, 300,  22,  250,  'FLAGGED',  NOW(), NOW()),
(12, 'Government High School - Guwahati',    'Paltan Bazaar, Guwahati, Assam',         26.1844, 91.7468, 450,  32,  400,  'ACTIVE',   NOW(), NOW()),
(13, 'Tribal Welfare School - Ranchi',       'Kanke, Ranchi, Jharkhand',               23.3978, 85.3218, 250,  18,  210,  'ACTIVE',   NOW(), NOW()),
(14, 'Closed Institute - Dehradun',          'Rajpur Road, Dehradun, Uttarakhand',     30.3165, 78.0322, 500,  0,   0,    'INACTIVE', NOW(), NOW()),
(15, 'Smart Learning Center - Chennai',      'T Nagar, Chennai, Tamil Nadu',           13.0418, 80.2341, 1000, 72,  920,  'ACTIVE',   NOW(), NOW());

-- ============================================
-- SAMPLE ATTENDANCE DATA
-- ============================================
INSERT IGNORE INTO attendance (id, institution_id, date, present_count, absent_count, total_count, recorded_at) VALUES
-- Delhi Public School
(1,  1, '2026-09-15', 1050, 50,  1100, NOW()),
(2,  1, '2026-09-14', 1020, 80,  1100, NOW()),
(3,  1, '2026-09-13', 1080, 20,  1100, NOW()),
(4,  1, '2026-09-12', 980,  120, 1100, NOW()),
(5,  1, '2026-09-11', 1060, 40,  1100, NOW()),
-- Kendriya Vidyalaya
(6,  2, '2026-09-15', 700,  20,  720,  NOW()),
(7,  2, '2026-09-14', 690,  30,  720,  NOW()),
(8,  2, '2026-09-13', 710,  10,  720,  NOW()),
-- Government ITI Pune
(9,  3, '2026-09-15', 400,  50,  450,  NOW()),
(10, 3, '2026-09-14', 350,  100, 450,  NOW()),
(11, 3, '2026-09-13', 380,  70,  450,  NOW()),
-- Flagged institution - Patna (low attendance pattern)
(12, 11, '2026-09-15', 100, 150, 250,  NOW()),
(13, 11, '2026-09-14', 80,  170, 250,  NOW()),
(14, 11, '2026-09-13', 120, 130, 250,  NOW()),
(15, 11, '2026-09-12', 90,  160, 250,  NOW()),
-- Central University Hyderabad
(16, 5, '2026-09-15', 1700, 100, 1800, NOW()),
(17, 5, '2026-09-14', 1650, 150, 1800, NOW()),
-- IIIT Bangalore
(18, 6, '2026-09-15', 1300, 50,  1350, NOW()),
(19, 6, '2026-09-14', 1280, 70,  1350, NOW()),
-- Smart Learning Center Chennai
(20, 15, '2026-09-15', 880, 40,  920,  NOW());

-- ============================================
-- SAMPLE COMPLAINTS
-- ============================================
INSERT IGNORE INTO complaints (id, institution_id, description, status, created_at) VALUES
(1, 11, 'Persistent low attendance observed over the last 2 weeks. Possible ghost beneficiaries.', 'OPEN', NOW()),
(2, 11, 'Infrastructure maintenance not completed despite allocated funds.', 'OPEN', NOW()),
(3, 3,  'Student complaint about inadequate lab equipment in ITI workshop.', 'OPEN', NOW()),
(4, 7,  'Report of unauthorized fee collection from students.', 'UNDER_REVIEW', NOW()),
(5, 1,  'Minor complaint about canteen hygiene. Resolved after inspection.', 'RESOLVED', NOW());

-- ============================================
-- SAMPLE INSPECTIONS
-- ============================================
INSERT IGNORE INTO inspections (id, inspection_code, institution_id, inspector_id, status, assigned_at, completed_at, remarks, checklist_json) VALUES
(1, 'INS-1001', 1,  1, 'COMPLETED', '2026-09-10 09:00:00', '2026-09-10 12:30:00', 'All systems operational. Good infrastructure.', '{"cleanliness":"PASS","safety":"PASS","staffPresence":"PASS","records":"PASS"}'),
(2, 'INS-1002', 11, 3, 'COMPLETED', '2026-09-12 10:00:00', '2026-09-12 14:00:00', 'Significant attendance discrepancies found. Records do not match actual headcount.', '{"cleanliness":"FAIL","safety":"PASS","staffPresence":"FAIL","records":"FAIL"}'),
(3, 'INS-1003', 5,  2, 'ASSIGNED',  '2026-09-18 08:00:00', NULL, NULL, NULL),
(4, 'INS-1004', 3,  4, 'ASSIGNED',  '2026-09-18 09:30:00', NULL, NULL, NULL);

-- ============================================
-- SAMPLE ALERTS
-- ============================================
INSERT IGNORE INTO alerts (id, institution_id, prediction_id, title, description, severity, is_read, created_at) VALUES
(1, 11, NULL, 'Low Attendance Alert', 'District Institute of Education, Patna has consistently low attendance below 50% for the past week.', 'HIGH', false, NOW()),
(2, 11, NULL, 'Multiple Complaints Filed', 'Multiple unresolved complaints filed against District Institute of Education, Patna.', 'MEDIUM', false, NOW()),
(3, 3,  NULL, 'Infrastructure Complaint', 'Complaint received about inadequate lab equipment at Government ITI, Pune.', 'LOW', true, NOW());
