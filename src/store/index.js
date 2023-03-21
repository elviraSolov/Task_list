import { createStore } from 'vuex'

export default createStore({
    state: {
        tasks: [
            {   id: 1, 
                title: 'Список 1', 
                body: [
                    {name: 'Task 1', done: true}, 
                    {name: 'Task 2', done: false}
                ]
            },
            {   id: 2, 
                title: 'Список 2', 
                body: [
                    {name: 'Задача №1', done: true}, 
                    {name: 'Задача №2', done: false}
                ]
            },
            {   id: 3, 
                title: 'Список 3', 
                body: [
                    {name: 'Задача 1', done: false}, 
                    {name: 'Задача 2', done: true},
                    {name: 'Задача 3', done: false},
                    {name: 'Задача 4', done: false}
                ]
            },
        ],
        tasksHistory: [
            {
                id: 1, 
                title: ['', 'Список 1'],
                body: [
                    {name: ['', 'Task 1'], done: [true, true]}, 
                    {name: ['', 'Task 2'], done: [false, false]}
                ]
            },
            {
                id: 2, 
                title: ['', 'Список 2'],
                body: [
                    {name: ['', 'Задача №1'], done: [true, true]}, 
                    {name: ['', 'Задача №2'], done: [false, false]}
                ]
            },
            {   id: 3, 
                title: ['','Список 3'], 
                body: [
                    {name: ['', 'Задача 1'], done: [true, true]}, 
                    {name: ['', 'Задача 2'], done: [true, true]},
                    {name: ['', 'Задача 3'], done: [true, true]},
                    {name: ['', 'Задача 4'], done: [false, false]}
                ]
            }
        ]
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        
        getTasksHistory(state) {
            return state.tasksHistory
        },
        getTaskById: (state) => (id) => {
            return state.tasks.find((task, index) => index === id)
        },
        getTaskHistoryById: (state) => (id) => {
            return state.tasksHistory.find((taskHistory, index) => index === id)
        }
    },
    actions: {
        addTask({ commit }, data) {
            commit('ADD_TASK', data)
        },
        removeTaskById({ commit }, data) {
            commit('REMOVE_TASK_BY_ID', data)
        },
        changeTaskTitle(context, data) {
            context.commit('CHANGE_TASK_TITLE', data)
        },
        removeTaskBodyChanges(context, data) {
            context.commit('REMOVE_TASK_BODY_CHANGES', data)
        },
        redo(context, data) {
            context.commit('REDO', data)
        },
        undo(context, data) {
            context.commit('UNDO', data)
        }
    },
    mutations: {
        ADD_TASK(state, data) {
            data.id = Date.now()
            let newTask = {
                id: data.id,
                title: ['', data.title],
                body: []
            }
            for (let index in data.body) {
                newTask.body.push({name: ['', data.body[index].name], done: [false, false]})
            }
            state.tasks.push(data)
            state.tasksHistory.push(newTask)

            console.log(data)
            console.log(state.tasks)
        },
        REMOVE_TASK_BY_ID(state, index) {
            state.tasks = state.tasks.filter(item => item.id !== index)
            state.tasksHistory = state.tasksHistory.filter(item => item.id !== index)
        },
        CHANGE_TASK_TITLE(task, taskHistory) {
            task.title = taskHistory.title[1] 
            
            //state.tasks[taskHistory.key].title = taskHistory.title[1]

            //state.tasks[task.key].title = task.title[1]
            // task.title[0] = task.title[1]
            // task.title[1] = task.title[2]
        },
        // CHANGE_BODY_NAME(state, body) {
        //     for (let index in body) {
        //         body[index].name[0] = body[index].name[1]
        //         body[index].name[1] = body[index].name[2]
        //     }
        // },
        REMOVE_TASK_BODY_CHANGES(_, body) {
            for (let index in body) {
                body[index].name[2] = body[index].name[1]
            }
        },
        UNDO(state, task) {
            task.title[2] = task.title[1]
            task.title[1] = task.title[0]
        }
    }
})