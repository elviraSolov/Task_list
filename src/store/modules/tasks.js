export default {
    state: {
        tasks: [
            {   id: 1, 
                title: 'Список 1', 
                body: [
                    {name: 'Задача 1', done: true}, 
                    {name: 'Задача 2', done: false}
                ]
            },
            {   id: 2, 
                title: 'Список 2', 
                body: [
                    {name: 'Задача 1', done: true}, 
                    {name: 'Задача 2', done: false},
                    {name: 'Задача 3', done: false},
                    {name: 'Задача 4', done: false}
                ]
            }
        ],
        tasksHistory: [
            {
                id: 1, 
                title: ['', 'Список 1'],
                body: [
                    {name: ['', 'Задача 1'], done: [true, true]}, 
                    {name: ['', 'Задача 2'], done: [false, false]}
                ]
            },
            {
                id: 2, 
                title: ['', 'Список 2'],
                body: [
                    {name: ['', 'Задача 1'], done: [true, true]}, 
                    {name: ['', 'Задача 2'], done: [false, false]},
                    {name: ['', 'Задача 3'], done: [false, false]},
                    {name: ['', 'Задача 4'], done: [false, false]}
                ]
            }
        ],
        task: {},
        taskHistory: {},
        isChanged: false
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        getTasksHistory(state) {
            return state.tasksHistory
        },
        getChanged(state) {
            return state.isChanged
        }
    },
    actions: {
        setTask({ commit }, data) {
            commit('SET_TASK', data)
        },
        setChanged({ commit }, data){
            commit('SET_CHANGED', data)
        },
        addTask({ commit }, data) {
            commit('ADD_TASK', data)
        },
        addTaskItem({ commit }) {
            commit('ADD_TASK_ITEM')
        },
        removeTaskById({ commit }, data) {
            commit('REMOVE_TASK_BY_ID', data)
        },
        changeTask({ commit }) {
            commit('CHANGE_TASK')
        },
        undoChanges({ commit }) {
            commit('UNDO_CHANGES')
        },
        removeTaskItem({ commit }, data) {
            commit('REMOVE_TASK_ITEM', data)
        }
    },
    mutations: {
        SET_TASK(state, taskId) {
            state.task = state.tasks.find(item => item.id === taskId)
            state.taskHistory = state.tasksHistory.find(item => item.id === taskId)
        },
        SET_CHANGED(state, changed) {
            state.isChanged = changed
        },
        ADD_TASK(state, data) {
            data.id = Date.now()
            let newTaskHistory = {
                id: data.id,
                title: ['', data.title],
                body: []
            }
            for (let index in data.body) {
                newTaskHistory.body.push({name: ['', data.body[index].name], done: [false, false]})
            }
            state.tasks.push(data)
            state.tasksHistory.push(newTaskHistory)
        },
        ADD_TASK_ITEM(state) {
            state.task.body.push ({name: '', done: false})
            state.taskHistory.body.push({name: ['', ''], done: ['', '']})
        },
        REMOVE_TASK_BY_ID(state, taskId) {
            state.tasks = state.tasks.filter(item => item.id !== taskId)
            state.tasksHistory = state.tasksHistory.filter(item => item.id !== taskId)
        },
        CHANGE_TASK(state) {
            state.taskHistory.title.splice(0, 1, state.task.title)
            state.task.title = state.taskHistory.title[1]

            for (let i in state.task.body) {
                state.taskHistory.body[i].name.splice(0, 1, state.task.body[i].name)
                state.task.body[i].name = state.taskHistory.body[i].name[1]
    
                state.taskHistory.body[i].done.splice(0, 1, state.task.body[i].done)
                state.task.body[i].done = state.taskHistory.body[i].done[1]
            }
        },
        UNDO_CHANGES(state) {
            [state.taskHistory.title[0], state.taskHistory.title[1]] =
            [state.taskHistory.title[1], state.taskHistory.title[0]]

            for (let i in state.taskHistory.body) {
                [state.taskHistory.body[i].name[0], state.taskHistory.body[i].name[1]] =
                [state.taskHistory.body[i].name[1], state.taskHistory.body[i].name[0]]
            }
        },
        REMOVE_TASK_ITEM(state, taskItemId) {
            state.task.body.splice(taskItemId, 1)
            state.taskHistory.body.splice(taskItemId, 1)
        }
    }
}
