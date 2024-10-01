# First Iteration

The plan is to create a FastAPI application that takes input either the name of policy or pdf of the policy as input. (`/analyse_policy`). If name is given, we find the corresponding policy. (Where can we find collection of all policies?).

First pass: Let's park the name for now and only take policy pdf as input.

This policy will be used by two FastAPI background tasks: `summarize_policy(pdf_content)` and `search_youtube(policy_name)`

* Summarizer Agent: This agent will summarize the contents of PDF based on a well-defined criteria. An example here : <https://joinditto.in/health-insurance/hdfc-ergo/optima-secure/v>

* Youtube video Agent: Ditto Insurace channel (<https://www.youtube.com/channel/UCyKj-yaTpbnWZY90ajxB8WQ>) has very good videos that provide detail analysis of the specific insurance policies. We can also provide a summary of the video (? additional feature maybe). We can accomplish this using CrewAI `YoutubeChannelSearchTool` tool : <https://docs.crewai.com/core-concepts/Tools/#available-crewai-tools>

Here's a more detailed workflow:

1. User uploads PDF to `/analyze_policy` endpoint.
2. FastAPI server:
    * Receives the PDF file.
    * Extracts the policy name from the filename or metadata.
    * Initiates two background tasks:
        a) summarize_policy(pdf_content)
        b) search_youtube(policy_name)
3. The server immediately returns a response with a task ID:

    ```json
    {
    "task_id": "abc123",
    "message": "Analysis in progress. Check status at /status/abc123"
    }
    ```

4. User can check the status at `/status/{task_id}` endpoint.
5. Once both tasks complete, the final result is available:

    ```json
    {
    "summary": {
        "pros": [...],
        "cons": [...]
    },
    "youtube_results": [
        {
        "title": "Understanding XYZ Insurance Policy",
        "url": "https://youtube.com/...",
        "channel": "Ditto Insurance"
        }
    ]
    }
    ```

What about database? How can we use it here? Ideally, we want a database so that frontend can use it to read and display the contents : Pros and Cons and Show the YT video for a uploaded PDF file.

First pass: Let's implement the above workflow. We can refactor it once we decide on frontend.

Frontend

We use React and TailwindCSS for creating a UI. We showcase 3 use-cases

* A comparison of What is Good?, What is Okay? and What is Bad? about the policy
* A Youtube video that is related to the policy (For now we just mock this by providing )
* Chat with document that enables user to ask any questions pertaining to the policy.
