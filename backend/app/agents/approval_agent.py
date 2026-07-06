from langgraph.types import interrupt
from app.models.state import WorkflowState


def approval_agent(state: WorkflowState):

    print("\nWaiting for Human Approval...")

    updated = interrupt(
        {
            "highlights": state["highlights"]
        }
    )

    state["highlights"] = updated["highlights"]

    return state