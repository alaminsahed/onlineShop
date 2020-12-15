import bcrypt from 'bcryptjs'
//hassink method


const users= [
    {
        name: 'Admin user',
        email:'admin@gmail.com',
        password: bcrypt.hashSync('123456',10) ,
        isAdmin: true
    },
    {
        name: 'Mofiz',
        email:'mofiz@gmail.com',
        password: bcrypt.hashSync('123456',10),
         
    },
    {
        name: 'Kalam',
        email:'kalam@gmail.com',
        password: bcrypt.hashSync('123456',10)
       
    },
    {
        name: 'Abbas',
        email:'abbas@gmail.com',
        password: bcrypt.hashSync('123456',10),
        
    },
    {
        name: 'Muza',
        email:'muza@gmail.com',
        password:bcrypt.hashSync('123456',10),
        
    },
    
    
]

export default users; 