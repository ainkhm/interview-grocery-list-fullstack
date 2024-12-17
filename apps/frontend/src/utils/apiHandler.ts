export const handleApiError = (error: any) => {
  if (error?.response?.status) {
    throw { status: error.response.status, message: error.message };
  }
  throw new Error('Something went wrong. Please try again later.');
};
