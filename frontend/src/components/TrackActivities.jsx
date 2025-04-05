import React, { useState, useEffect } from 'react'
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
import { BASE_URL } from '../redux/constants'

// Activity types with colors
const activityTypes = [
  { name: 'Running', icon: '🏃', color: '#FF6B6B' },
  { name: 'Walking', icon: '🚶', color: '#4ECDC4' },
  { name: 'Cycling', icon: '🚴', color: '#45B7D1' },
  { name: 'Swimming', icon: '🏊', color: '#3A86FF' },
  { name: 'Gym', icon: '🏋️', color: '#FFBE0B' },
  { name: 'Yoga', icon: '🧘', color: '#8338EC' },
  { name: 'Sports', icon: '⚽', color: '#06D6A0' },
]

const TrackActivities = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const userId = userInfo?._id

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

  // Load activities
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

  // Save activities
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

    let calories = newActivity.calories
    if (!calories && newActivity.duration && newActivity.type) {
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
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="relative mr-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {userInfo?.avatar ? (
              <img
                src={`${BASE_URL}/${userInfo.avatar}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-600 dark:text-gray-300">
                {userInfo?.firstName?.charAt(0)}
                {userInfo?.lastName?.charAt(0)}
              </span>
            )}
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition">
            +
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome back, {userInfo?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your activities and stay healthy
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Activities"
          value={stats.totalActivities}
          icon="🏋️"
          color="bg-blue-500 dark:bg-blue-600"
        />
        <StatCard
          title="Active Minutes"
          value={stats.totalMinutes}
          icon="⏱️"
          color="bg-red-500 dark:bg-red-600"
          unit="mins"
        />
        <StatCard
          title="Calories Burned"
          value={stats.totalCalories}
          icon="🔥"
          color="bg-green-500 dark:bg-green-600"
          unit="kcal"
        />
        <StatCard
          title="Favorite Activity"
          value={stats.favoriteActivity || 'None'}
          icon="⭐"
          color="bg-purple-500 dark:bg-purple-600"
        />
      </div>

      {/* Activity Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {editingId ? 'Edit Activity' : 'Log New Activity'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Activity Type
            </label>
            <select
              name="type"
              value={newActivity.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {activityTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.icon} {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (minutes)
            </label>
            <input
              name="duration"
              type="number"
              value={newActivity.duration}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Distance (km)
            </label>
            <input
              name="distance"
              type="number"
              value={newActivity.distance}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calories Burned
            </label>
            <input
              name="calories"
              type="number"
              value={newActivity.calories}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              name="date"
              type="date"
              value={newActivity.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={newActivity.notes}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="col-span-full flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
            >
              {editingId ? 'Update' : 'Add Activity'}
            </button>
            {editingId && (
              <button
                type="button"
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
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Weekly Activity
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  itemStyle={{ color: '#1f2937' }}
                />
                <Legend />
                <Bar
                  dataKey="minutes"
                  fill="#8884d8"
                  name="Active Minutes"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Activity Distribution
          </h3>
          <div className="h-80">
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  itemStyle={{ color: '#1f2937' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Your Activities
        </h2>
        {activities.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No activities logged yet. Add your first activity above!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((activity) => {
                const activityType = activityTypes.find(
                  (type) => type.name === activity.type
                )
                return (
                  <div
                    key={activity.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition hover:shadow-md bg-white dark:bg-gray-700"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                          style={{
                            backgroundColor: activityType?.color || '#e5e7eb',
                          }}
                        >
                          {activityType?.icon || '🏋️'}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {activity.type}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {format(new Date(activity.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center px-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Duration
                          </p>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {activity.duration} mins
                          </p>
                        </div>
                        {activity.distance && (
                          <div className="text-center px-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Distance
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {activity.distance} km
                            </p>
                          </div>
                        )}
                        {activity.calories && (
                          <div className="text-center px-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Calories
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {activity.calories} kcal
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(activity.id)}
                          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-md transition"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-600 rounded-md transition"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    {activity.notes && (
                      <>
                        <div className="border-t border-gray-200 dark:border-gray-600"></div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-600">
                          <p className="text-sm text-gray-600 dark:text-gray-200">
                            {activity.notes}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, icon, color, unit }) => {
  return (
    <div className={`${color} rounded-lg p-6 text-white`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">
            {value}{' '}
            {unit && (
              <span className="text-sm font-normal opacity-80">{unit}</span>
            )}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

export default TrackActivities
