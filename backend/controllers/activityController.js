import ActivityLog from '../models/activityLog.model.js'

// Log button click (all authenticated users)
export const logButtonClick = async (req, res) => {
  try {
    const { buttonClicked } = req.body;

    if (!['Button A', 'Button B'].includes(buttonClicked)) {
      return res.status(400).json({ message: 'Invalid button clicked' });
    }

    const activityLog = new ActivityLog({
      userId: req.user._id,
      username: req.user.username,
      role: req.user.role,
      buttonClicked,
    });

    await activityLog.save();

    res.json({
      message: `${buttonClicked} click logged successfully`,
      timestamp: activityLog.timestamp
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get activity logs (admin and manager only)
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('userId', 'username role')
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const updateLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { buttonClicked } = req.body;

    const updatedLog = await ActivityLog.findByIdAndUpdate(
      id,
      { buttonClicked },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ message: 'Log not found' });
    }

    res.json({
      message: 'Log updated successfully',
      log: updatedLog
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLog = await ActivityLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ message: 'Log not found' });
    }

    res.json({
      message: 'Log deleted successfully',
      deletedLog: deletedLog
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
