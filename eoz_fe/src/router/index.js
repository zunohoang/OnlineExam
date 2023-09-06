import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Student from '../views/student/Student.vue'
import Dashboard from '../views/student/Dashboard.vue'
import MyClass from '../views/student/MyClass.vue'
import Test from '../views/student/Test.vue'
import TakeTest from '../views/student/TakeTest.vue'
import Point from '../views/student/Point.vue'
import roomManager from '../views/teacher/roomManager.vue'
import Teacher from '../views/teacher/Teacher.vue'
import Manager from '../views/teacher/Manager.vue'
import createTest from '../views/teacher/createTest.vue'
import myTest from '../views/teacher/myTest.vue'
import roomidManager from '../views/teacher/roomidManager.vue'
import studentsManager from '../views/teacher/studentsManager.vue'
import testsManager from '../views/teacher/testsManager.vue'

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/student',
        component: Student,
        children: [
            {
                path: 'class',
                component: MyClass,
            },
            {
                path: 'dashboard',
                component: Dashboard,
            },
            {
                name: 'testid',
                path: 'test/:id',
                component: Test,
            },
            {
                name: 'point',
                path: 'point/:id',
                component: Point,
            }
        ]
    },
    {
        name: 'take-test',
        path: '/take-test/:id',
        component: TakeTest,
    },
    {
        path: '/teacher',
        component: Teacher,
        children: [
            {
                path: 'manager',
                component: Manager,
                children: [
                    {
                        name: 'createTest',
                        path: 'createtest',
                        component: createTest,
                    },
                    {
                        name: 'room',
                        path: 'room',
                        component: roomManager,
                    },
                    {
                        name: 'roomid',
                        path: 'room/:_id',
                        component: roomidManager,
                        children: [
                            {
                                name: 'students',
                                path: 'students',
                                component: studentsManager
                            },
                            {
                                name: 'tests',
                                path: 'tests',
                                component: testsManager
                            }
                        ]
                    }
                    , {
                        name: 'myTest',
                        path: 'mytest',
                        component: myTest,
                    }
                ]
            },
        ]
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
