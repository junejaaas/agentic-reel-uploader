from app.models.state import WorkflowState


def finalize_agent(state: WorkflowState):

    approved = []

    for clip in state["highlights"]:

        if clip["status"] == "approved":
            approved.append(clip)

    state["highlights"] = approved

    return state