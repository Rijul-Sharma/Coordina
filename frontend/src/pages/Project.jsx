import React, { useEffect, useState } from 'react'
import Modal from '../components/modal'

const projectId = "68ef381220039863edc5abbb";

const Project = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // form state for add task
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('To Do')
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignees, setAssignees] = useState([])
  const [saving, setSaving] = useState(false)

  const loadTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/projects/${projectId}/tasks`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()

      // Normalize server response to the UI shape expected by this component
      const normalized = (data.tasks || []).map((t) => ({
        id: t.id || t._id,
        name: t.name || t.title,
        description: t.description || t.desc || '',
        deadline: t.deadline || t.dueDate || null,
        priority: t.priority || 'Low',
        employeeNum: typeof t.employeeNum === 'number' ? t.employeeNum : (Array.isArray(t.assignees) ? t.assignees.length : 0),
      }))

      setTasks(normalized)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [projectId])

  return (
    <div className='w-full h-screen'>
      <div className='m-10 flex justify-between items-center'>
        <div className='text-5xl ml-20'>Project</div>
        <button onClick={() => setIsModalOpen(true)} className='bg-blue-500 text-white px-4 py-2 rounded'>+ Add Task</button>
      </div>

      <div className='w-[90%] mx-auto'>
        {loading ? (
          <div>Loading tasks...</div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[700px] divide-y divide-gray-200 bg-white shadow-sm rounded'>
              <thead>
                <tr className='bg-gray-50 text-left text-sm text-gray-600'>
                  <th className='p-4 w-16'>S.No</th>
                  <th className='p-4'>Task</th>
                  <th className='p-4 w-36'>Assignees</th>
                  <th className='p-4 w-40'>Deadline</th>
                  <th className='p-4 w-32'>Priority</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-700'>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='p-6 text-center text-gray-500'>No tasks found</td>
                  </tr>
                ) : (
                  tasks.map((t, idx) => {
                    const priorityColors = {
                      High: 'bg-red-100 text-red-800',
                      Medium: 'bg-yellow-100 text-yellow-800',
                      Low: 'bg-green-100 text-green-800'
                    }
                    return (
                      <tr key={t.id} className='hover:bg-gray-50'>
                        <td className='p-4 align-top'>{idx + 1}</td>
                        <td className='p-4 align-top'>
                          <div className='font-semibold text-gray-900'>{t.name}</div>
                          {t.description && <div className='text-xs text-gray-500 mt-1'>{t.description}</div>}
                        </td>
                        <td className='p-4 align-top'>
                          <span className='inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm'>
                            {t.employeeNum}
                          </span>
                        </td>
                        <td className='p-4 align-top'>{t.deadline ? new Date(t.deadline).toLocaleDateString() : '—'}</td>
                        <td className='p-4 align-top'>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${priorityColors[t.priority] || 'bg-gray-100 text-gray-800'}`}>
                            {t.priority}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Task"
        size="md"
        footer={(
          <div className='flex gap-2 justify-end'>
            <button onClick={() => setIsModalOpen(false)} className='px-4 py-2 rounded bg-gray-200'>Cancel</button>
            <button onClick={async () => {
              if (!title) return
              setSaving(true)
              try {
                const payload = {
                  projectId,
                  title,
                  description,
                  priority,
                  status,
                  startDate: startDate || null,
                  dueDate: dueDate || null,
                  assignees: assignees
                }

                const res = await fetch('http://localhost:3000/api/tasks', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                })

                if (!res.ok) {
                  const err = await res.json().catch(() => ({}))
                  throw new Error(err.message || 'Failed to create task')
                }

                // refresh list and close
                await loadTasks()
                setIsModalOpen(false)
                // reset form
                setTitle('')
                setDescription('')
                setPriority('Low')
                setStatus('To Do')
                setStartDate('')
                setDueDate('')
                setAssignees([])
              } catch (e) {
                console.error(e)
                alert(e.message || 'Could not create task')
              } finally {
                setSaving(false)
              }
            }} className={`px-4 py-2 rounded text-white ${title && !saving ? 'bg-blue-600' : 'bg-blue-300'}`}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      >
        <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className='mt-1 block w-full border rounded px-3 py-2' placeholder='Task title' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1 block w-full border rounded px-3 py-2' rows={3} placeholder='Short description' />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className='mt-1 block w-full border rounded px-3 py-2'>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className='mt-1 block w-full border rounded px-3 py-2'>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Start date</label>
              <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} className='mt-1 block w-full border rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Due date</label>
              <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} className='mt-1 block w-full border rounded px-3 py-2' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Assignees</label>
            <div className='mt-1 text-sm text-gray-500'>You can select employees here — employee list will be fetched and added later.</div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Project;   