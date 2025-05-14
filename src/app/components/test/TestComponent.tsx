// Intentionally unformatted code to test ESLint and Prettier
const    TestComponent     =   (     )     =>        {
    const [count,setCount] = useState<number>   (0)
    
    function handleClick()    {
        setCount(prev=>prev+1)
    }

return(
        <div style={{   padding:   "20px",    margin:    "10px"   }}>
            <h1>        Test Component        </h1>
            <p>Count:    {count}</p>
            <button     onClick={   handleClick   }>
                Increment
            </button>
        </div>
    )
}
