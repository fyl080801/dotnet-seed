namespace Seed.Modules.Exceptions
{
    [System.Serializable]
    public class GeneralOperateException : System.Exception
    {
        public GeneralOperateException() { }

        public GeneralOperateException(string message) : base(message) { }

        public GeneralOperateException(string message, System.Exception inner) : base(message, inner) { }

        protected GeneralOperateException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context)
        { }
    }
}