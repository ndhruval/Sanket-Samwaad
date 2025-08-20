const getQuizQuestion = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${BACKEND_URL}/api/quiz/question`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch quiz question');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching quiz question:', error);
        throw error;
    }
};