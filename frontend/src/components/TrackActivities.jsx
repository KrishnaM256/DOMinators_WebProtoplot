import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Avatar,
  Paper,
  Divider,
  Badge,
  IconButton,
} from '@mui/material'
import {
  FitnessCenter,
  DirectionsRun,
  DirectionsWalk,
  Pool,
  PedalBike,
  SelfImprovement,
  Add,
  Delete,
  Edit,
  SportsSoccer,
} from '@mui/icons-material'
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

// Activity types with icons and colors
const activityTypes = [
  { name: 'Running', icon: <DirectionsRun />, color: '#FF6B6B' },
  { name: 'Walking', icon: <DirectionsWalk />, color: '#4ECDC4' },
  { name: 'Cycling', icon: <PedalBike />, color: '#45B7D1' },
  { name: 'Swimming', icon: <Pool />, color: '#3A86FF' },
  { name: 'Gym', icon: <FitnessCenter />, color: '#FFBE0B' },
  { name: 'Yoga', icon: <SelfImprovement />, color: '#8338EC' },
  { name: 'Sports', icon: <SportsSoccer />, color: '#06D6A0' },
]

const TrackActivities = () => {
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const userId = userInfo?._id

  // State for activities
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({
    type: 'Walking',
    duration: 30,
    distance: '',
    calories: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalMinutes: 0,
    totalCalories: 0,
    favoriteActivity: '',
  })

  // Load activities from localStorage when component mounts
  useEffect(() => {
    if (userId) {
      const allActivities =
        JSON.parse(localStorage.getItem('userActivities')) || {}
      const userActivities = allActivities[userId] || []
      setActivities(userActivities)
      calculateStats(userActivities)
    }
  }, [userId])

  // Calculate statistics
  const calculateStats = (activities) => {
    const totalActivities = activities.length
    const totalMinutes = activities.reduce(
      (sum, activity) => sum + (parseInt(activity.duration) || 0),
      0
    )
    const totalCalories = activities.reduce(
      (sum, activity) => sum + (parseInt(activity.calories) || 0),
      0
    )

    // Find favorite activity
    const activityCounts = {}
    activities.forEach((activity) => {
      activityCounts[activity.type] = (activityCounts[activity.type] || 0) + 1
    })
    const favoriteActivity = Object.keys(activityCounts).reduce(
      (a, b) => (activityCounts[a] > activityCounts[b] ? a : b),
      'None'
    )

    setStats({
      totalActivities,
      totalMinutes,
      totalCalories,
      favoriteActivity,
    })
  }

  // Save activities to localStorage
  const saveActivities = (updatedActivities) => {
    const allActivities =
      JSON.parse(localStorage.getItem('userActivities')) || {}
    allActivities[userId] = updatedActivities
    localStorage.setItem('userActivities', JSON.stringify(allActivities))
    setActivities(updatedActivities)
    calculateStats(updatedActivities)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewActivity((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle activity submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Calculate calories if not provided (simple estimation)
    let calories = newActivity.calories
    if (!calories && newActivity.duration && newActivity.type) {
      // Very basic estimation (calories per minute)
      const estimates = {
        Running: 10,
        Walking: 5,
        Cycling: 8,
        Swimming: 7,
        Gym: 6,
        Yoga: 3,
        Sports: 7,
      }
      calories = estimates[newActivity.type] * parseInt(newActivity.duration)
    }

    const activityToSave = {
      ...newActivity,
      calories: calories || 0,
      id: editingId || Date.now().toString(),
      distance: newActivity.distance || 0,
    }

    let updatedActivities
    if (editingId) {
      updatedActivities = activities.map((activity) =>
        activity.id === editingId ? activityToSave : activity
      )
      setEditingId(null)
    } else {
      updatedActivities = [...activities, activityToSave]
    }

    saveActivities(updatedActivities)
    setNewActivity({
      type: 'Walking',
      duration: 30,
      distance: '',
      calories: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      notes: '',
    })
  }

  // Handle edit
  const handleEdit = (id) => {
    const activityToEdit = activities.find((activity) => activity.id === id)
    if (activityToEdit) {
      setNewActivity({
        type: activityToEdit.type,
        duration: activityToEdit.duration,
        distance: activityToEdit.distance,
        calories: activityToEdit.calories,
        date: activityToEdit.date,
        notes: activityToEdit.notes || '',
      })
      setEditingId(id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle delete
  const handleDelete = (id) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    )
    saveActivities(updatedActivities)
  }

  // Prepare data for charts
  const prepareChartData = () => {
    // Weekly activity data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return format(date, 'yyyy-MM-dd')
    }).reverse()

    const weeklyData = last7Days.map((date) => {
      const dayActivities = activities.filter((act) => act.date === date)
      const totalMinutes = dayActivities.reduce(
        (sum, act) => sum + parseInt(act.duration),
        0
      )
      return {
        date: format(new Date(date), 'EEE'),
        minutes: totalMinutes,
      }
    })

    // Activity type distribution
    const typeDistribution = activityTypes
      .map((type) => {
        const count = activities.filter((act) => act.type === type.name).length
        return {
          name: type.name,
          value: count,
          color: type.color,
        }
      })
      .filter((item) => item.value > 0)

    return { weeklyData, typeDistribution }
  }

  const { weeklyData, typeDistribution } = prepareChartData()

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header with user info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'white' }}
            >
              <Add />
            </IconButton>
          }
        >
          <Avatar src={userInfo?.avatar} sx={{ width: 80, height: 80, mr: 3 }}>
            {userInfo?.firstName?.charAt(0)}
            {userInfo?.lastName?.charAt(0)}
          </Avatar>
        </Badge>
        <Box>
          <Typography variant="h4" component="h1">
            Welcome back, {userInfo?.firstName}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your activities and stay healthy
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Activities"
          value={stats.totalActivities}
          icon={<FitnessCenter />}
          color="#3A86FF"
        />
        <StatCard
          title="Active Minutes"
          value={stats.totalMinutes}
          icon={<DirectionsRun />}
          color="#FF6B6B"
          unit="mins"
        />
        <StatCard
          title="Calories Burned"
          value={stats.totalCalories}
          icon={<Pool />}
          color="#06D6A0"
          unit="kcal"
        />
        <StatCard
          title="Favorite Activity"
          value={stats.favoriteActivity || 'None'}
          icon={<SelfImprovement />}
          color="#8338EC"
        />
      </Box>

      {/* Activity Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editingId ? 'Edit Activity' : 'Log New Activity'}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>
            <Select
              name="type"
              value={newActivity.type}
              onChange={handleInputChange}
              label="Activity Type"
            >
              {activityTypes.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ color: type.color, mr: 1 }}>{type.icon}</Box>
                    {type.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="duration"
            label="Duration (minutes)"
            type="number"
            value={newActivity.duration}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            name="distance"
            label="Distance (km)"
            type="number"
            value={newActivity.distance}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            name="calories"
            label="Calories Burned"
            type="number"
            value={newActivity.calories}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            name="date"
            label="Date"
            type="date"
            value={newActivity.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ gridColumn: { xs: '1 / -1', sm: 'span 1' } }}
          />

          <TextField
            name="notes"
            label="Notes"
            value={newActivity.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
            sx={{ gridColumn: { xs: '1 / -1', sm: 'span 2' } }}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              gridColumn: '1 / -1',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: 150 }}
            >
              {editingId ? 'Update' : 'Add Activity'}
            </Button>
            {editingId && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditingId(null)
                  setNewActivity({
                    type: 'Walking',
                    duration: 30,
                    distance: '',
                    calories: '',
                    date: format(new Date(), 'yyyy-MM-dd'),
                    notes: '',
                  })
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Charts Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Activity
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="minutes" fill="#8884d8" name="Active Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Activity Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Box>

      {/* Activities List */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Your Activities
        </Typography>
        {activities.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No activities logged yet. Add your first activity above!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activities
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((activity) => {
                const activityType = activityTypes.find(
                  (type) => type.name === activity.type
                )
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card variant="outlined">
                      <CardContent
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                          <Box
                            sx={{
                              bgcolor: activityType?.color || '#eee',
                              color: 'white',
                              p: 2,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {activityType?.icon || <FitnessCenter />}
                          </Box>
                          <Box>
                            <Typography variant="h6">
                              {activity.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {format(new Date(activity.date), 'MMM d, yyyy')}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Box sx={{ textAlign: 'center', px: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Duration
                            </Typography>
                            <Typography fontWeight="bold">
                              {activity.duration} mins
                            </Typography>
                          </Box>
                          {activity.distance && (
                            <Box sx={{ textAlign: 'center', px: 2 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Distance
                              </Typography>
                              <Typography fontWeight="bold">
                                {activity.distance} km
                              </Typography>
                            </Box>
                          )}
                          {activity.calories && (
                            <Box sx={{ textAlign: 'center', px: 2 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Calories
                              </Typography>
                              <Typography fontWeight="bold">
                                {activity.calories} kcal
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            onClick={() => handleEdit(activity.id)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(activity.id)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </CardContent>
                      {activity.notes && (
                        <>
                          <Divider />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              {activity.notes}
                            </Typography>
                          </CardContent>
                        </>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
          </Box>
        )}
      </Paper>
    </Box>
  )
}

// Stat Card Component
const StatCard = ({ title, value, icon, color, unit }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {value}{' '}
            {unit && (
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {unit}
              </Typography>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: color,
            color: 'white',
            p: 2,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { fontSize: 'large' })}
        </Box>
      </Box>
    </Paper>
  )
}

export default TrackActivities
