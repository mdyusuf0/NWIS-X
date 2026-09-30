import pytest

@pytest.fixture
def sample_well_data():
    """Fixture for test well data."""
    return {"id": 1, "name": "Test Well"}
