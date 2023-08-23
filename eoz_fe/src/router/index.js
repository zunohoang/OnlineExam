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
import ClassManager from '../views/teacher/ClassManager.vue'
import Teacher from '../views/teacher/Teacher.vue'

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
                component: ClassManager,
                children: [
                    {
                        name: 'createTest',
                        path: 'createtest',
                    },
                    {
                        name: 'classManager',
                        path: 'classmanager',
                    },
                    {
                        name: 'myTest',
                        path: 'mytest'
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
