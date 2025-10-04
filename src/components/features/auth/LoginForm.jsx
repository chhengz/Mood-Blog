// LoginForm.jsx



const LoginForm = ({formData, onChange, onSubmit, isLoading, error}) => {


  return (
    <form className='w-full space-y-2 my-6' onSubmit={onSubmit}>
        <div>
            {/* <label htmlFor="email" className='block mb-1 font-medium text-gray-700'>Email</label> */}
            <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder='Your email'
            className='w-full px-3 py-2 text-md text-gray-400 bg-zinc-900/50 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-600/50 shadow-lg'
            />
        </div>

        <div>
            {/* <label htmlFor="password" className='block mb-1 font-medium text-gray-700'>Password</label> */}
            <input 
            type="password" 
            id="password" 
             name="password"   
            value={formData.password}
            onChange={onChange}
            placeholder='Your password'
            className='w-full px-3 py-2 text-md text-gray-400 bg-zinc-900/50 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-600/50 shadow-lg'
            />
        </div>

        {error && <p className='text-red-500 text-md'>{error}</p>}

        <button
            type="submit"
            className='w-full mt-2 px-4 py-2 text-md font-bold text-[var(--text-black)] bg-white rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600/50 shadow-lg cursor-pointer hover:scale-102 transition'
            disabled={isLoading}
        >
            {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

    </form>
  )
}

export default LoginForm