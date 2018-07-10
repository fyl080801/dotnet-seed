namespace Seed.Environment.Engine
{
    public interface IRunningEngineTable
    {
        void Add(EngineSettings settings);
        void Remove(EngineSettings settings);
        EngineSettings Match(string host, string appRelativeCurrentExecutionFilePath, bool fallbackToDefault = true);
    }
}