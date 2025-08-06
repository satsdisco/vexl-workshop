// Simple script to seed the database
console.log('🌱 Seeding database...')

fetch('http://localhost:3000/api/admin/seed', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer P2Pnokyc'
  }
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    console.log('✅ Database seeded successfully!')
  } else {
    console.error('❌ Failed to seed database:', data.error)
  }
})
.catch(err => {
  console.error('❌ Error:', err)
})