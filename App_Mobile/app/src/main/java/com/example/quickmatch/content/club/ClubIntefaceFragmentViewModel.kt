package com.example.quickmatch.content.club

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.quickmatch.content.player
import com.example.quickmatch.network.ClubObject
import com.example.quickmatch.network.DatabaseApi
import com.example.quickmatch.network.PlayerAndPlayerBelongClubObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import timber.log.Timber

class ClubIntefaceFragmentViewModel(private val clubId : Int) : ViewModel() {

    val club = MutableLiveData<ClubObject>()
    val players = MutableLiveData<List<PlayerAndPlayerBelongClubObject>>()

    private val _getClubDetailsStatus = MutableLiveData<RequestStatus>()
    val getClubDetailsStatus : LiveData<RequestStatus>
        get() = _getClubDetailsStatus

    private val _getClubPlayersStatus = MutableLiveData<RequestStatus>()
    val getClubPlayersStatus : LiveData<RequestStatus>
        get() = _getClubPlayersStatus

    private val _leaveClubStatus = MutableLiveData<RequestStatus>()
    val leaveClubStatus : LiveData<RequestStatus>
        get() = _leaveClubStatus

    // Create coroutine job and scope
    private var viewModelJob = Job()

    // Uses main thread coz retrofit works itself on background threads
    private val coroutineScope = CoroutineScope(viewModelJob + Dispatchers.Main)

    init {
        getClubDetails()
        getClubPlayers()
    }

    private fun getClubDetails() {

        _getClubDetailsStatus.value = RequestStatus.LOADING

        coroutineScope.launch {

            try {

                club.value = DatabaseApi.retrofitService.getClubById(clubId)
                _getClubDetailsStatus.value = RequestStatus.DONE

            } catch (t: Throwable) {

                Timber.i(t.message + " / getClubDetails()")
                _getClubDetailsStatus.value = RequestStatus.ERROR

            }
        }
    }

    private fun getClubPlayers() {

        _getClubPlayersStatus.value = RequestStatus.LOADING

        coroutineScope.launch {

            try {

                players.value = DatabaseApi.retrofitService.getClubPlayers(clubId)
                _getClubPlayersStatus.value = RequestStatus.DONE

            } catch (t: Throwable) {

                Timber.i(t.message + " / getClubPlayers()")
                _getClubPlayersStatus.value = RequestStatus.ERROR

            }
        }
    }

    fun leaveClub() {

        _leaveClubStatus.value = RequestStatus.LOADING

        coroutineScope.launch {

            try {

                DatabaseApi.retrofitService.removePlayerFromClub(clubId, player.id!!)
                _leaveClubStatus.value = RequestStatus.DONE


            } catch (t: Throwable) {

                Timber.i(t.message + "/ leaveClub()")
                _leaveClubStatus.value = RequestStatus.ERROR

            }
        }
    }

    fun onClubLeft() {
        _leaveClubStatus.value = null
    }
}
