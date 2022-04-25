const { createClient } = supabase;
const _supabase = createClient('https://plzqmoyjztnrybiitaxg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsenFtb3lqenRucnliaWl0YXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkyNzYxOTIsImV4cCI6MTk2NDg1MjE5Mn0.abB3d_KHmtzLwijgCB8iIdvnCZtDuYWFCfrqwLP51cA');

const handleFormRegisterSubmit = async(event) => {
    event.preventDefault();

    const email = document.getElementById('email_signup');
    const password = document.getElementById('password_signup');
    const confirmPassword = document.getElementById('confirmPassword_signup');

    if(email.value.length >= 2 && password.value.length >= 2 && confirmPassword.value.length >= 2){
        if(password.value.length >= 6){
            if(password.value == confirmPassword.value){
                let {user, error} = await _supabase.auth.signUp({
                    email: email.value,
                    password: password.value,
                });
                if(error){
                    console.log(error);
                    return;
                };
                alert('Confirme a senha em seu email')
                handleFormChange(event);
            }else{
                alert('As senhas devem ser iguais!')
            }
        }else{
            alert('A senha deve conter 6 ou mais digitos!')
        }
    }else{
        alert('Alguma informação esta faltando!');
    };
};

const handleFormloginSubmit = async(event) => {
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const { user, error } = await _supabase.auth.signIn({
        email: email.value,
        password: password.value,
    });

    if(error){
        console.log(error);
        if(error.message == 'Invalid login credentials'){
            alert('Email ou senha incorretos!');
        } else if(error.message == 'Email not confirmed'){
            alert('Email não confirmado!');
        };
        return;
    };

    if(user){
        window.location.href = 'https://gabrieldiasdev.github.io/studioGhibli/'
    };

};

const handleFormGoogleLoginSubmit = async(event) => {
    event.preventDefault();

    const { user, session, error } = await _supabase.auth.signIn({
            provider: 'google',
        }, {
            redirectTo: 'https://gabrieldiasdev.github.io/studioGhibli/'
        });

    if(error){
        console.log(error);
        return;
    };



};

let screen = 'logar';

const handleFormChange = (event) => {
    event.preventDefault();

    const loginForm = document.getElementById('signin_form');
    const signupForm = document.getElementById('signup_form');

    if (screen == 'logar'){
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        window.setTimeout(function(){
            signupForm.style.opacity = 1;
        },0);
        loginForm.style.opacity = 0;
        screen = 'cadastrar';
    }else if(screen == 'cadastrar'){
        signupForm.style.opacity = 0;
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
        window.setTimeout(function(){
            loginForm.style.opacity = 1;
        },0);
        screen = 'logar';
    };
};