package com.example.quickmatch.access.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.quickmatch.network.DatabaseApi
import com.example.quickmatch.network.PlayerObject
import com.example.quickmatch.utils.HashUtils.sha512
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import timber.log.Timber

enum class LoginStatus { UNKNOWN, GOOGLE, WRONG_PWD, NETWORK_ERROR, SUCCESS }

class LoginFragmentViewModel : ViewModel() {

    /* Result of the login query */
    private val _loginStatus = MutableLiveData<LoginStatus>()
    val loginStatus : LiveData<LoginStatus>
        get() = _loginStatus

    /* Player object received from database */
    private var _player : PlayerObject? = null
    val player : PlayerObject?
        get() = _player

    /* Create coroutine job and  */
    private var viewModelJob = Job()

    /* Uses main thread coz retrofit works itself on background threads */
    private val coroutineScope = CoroutineScope(viewModelJob + Dispatchers.Main)


    fun tryToLogin(mailAddress : String, password : String) {

        coroutineScope.launch {

            try {

                _player = DatabaseApi.retrofitService.getPlayerByMail(mailAddress)

                Timber.i(_player.toString())

                checkPassword(_player!!, sha512(password + _player!!.id.toString()))

            } catch (t: Throwable) {

                Timber.i(t.message)
                _loginStatus.value = LoginStatus.NETWORK_ERROR

            }
        }
    }

    //TODO unhash password before check

    private fun checkPassword(player : PlayerObject, password: String) = when (player.password) {
                                                                                "stocked by Google" -> _loginStatus.value = LoginStatus.GOOGLE
                                                                                password ->  _loginStatus.value = LoginStatus.SUCCESS
                                                                                else -> _loginStatus.value = LoginStatus.WRONG_PWD
                                                                                }

}