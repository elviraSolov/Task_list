import { createStore } from 'vuex'

export default createStore({
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
                    {name: ['', 'Task 1'], done: [true, true]}, 
                    {name: ['', 'Task 2'], done: [false, false]}
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
        changeTask({ commit }, data) {
            commit('CHANGE_TASK', data)
        },
        undoChanges({commit}, data) {
            commit('UNDO_CHANGES', data)
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
        },
        REMOVE_TASK_BY_ID(state, taskId) {
            state.tasks = state.tasks.filter(item => item.id !== taskId)
            state.tasksHistory = state.tasksHistory.filter(item => item.id !== taskId)
        },
        CHANGE_TASK(state, taskId) {
            const task = state.tasks.find(item => item.id === taskId);
            const taskHistory = state.tasksHistory.find(item => item.id === taskId)

            // изменяет название задания
            taskHistory.title[0] = task.title;
            task.title = taskHistory.title[1]

            // изменяет задачи
            for (let i in task.body) {
                // названия
                taskHistory.body[i].name[0] = task.body[i].name
                task.body[i].name = taskHistory.body[i].name[1]
                // чекбоксы
                taskHistory.body[i].done[0] = task.body[i].done
                task.body[i].done = taskHistory.body[i].done[1]
            }
        },
        UNDO_CHANGES(state, taskId) {
            const taskHistory = state.tasksHistory.find(item => item.id === taskId);
            const titleBuf = taskHistory.title[0]; 

            taskHistory.title[0] = taskHistory.title[1];
            taskHistory.title[1] = titleBuf;

            for (let i in taskHistory.body) {
                let nameBuf = taskHistory.body[i].name[0];
                let doneBuf = taskHistory.body[i].done[0];
                // названия
                taskHistory.body[i].name[0] = taskHistory.body[i].name[1];
                taskHistory.body[i].name[1] = nameBuf;
                // чекбоксы
                taskHistory.body[i].done[0] = taskHistory.body[i].done[1];
                taskHistory.body[i].done[1] = doneBuf;
            }
        }
    }
})