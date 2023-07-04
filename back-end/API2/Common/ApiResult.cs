namespace API2.Common
{
	public class ApiResult
	{
		public bool Ok { get; set; }
		public object Result { get; set; }

		public ApiResult(bool success)
		{
			Ok = success;
		}

		public ApiResult(object result)
		{
			Ok = true;
			Result = result;
		}
	}
}