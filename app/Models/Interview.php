<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use App\User;
use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Interview
 * 
 * @property int $interview_id
 * @property string $title
 * @property \Carbon\Carbon $start_date
 * @property string $location
 * 
 * @property \Illuminate\Database\Eloquent\Collection $evaluation_criteria
 * @property \Illuminate\Database\Eloquent\Collection $interviewees
 * @property \App\Models\InterviewerHasInterview $interviewer_has_interview
 *
 * @package App\Models
 */
class Interview extends Eloquent
{
	protected $table = 'interview';
    protected $primaryKey = 'id';
	public $timestamps = false;

	protected $dates = [
        'date'
	];

	protected $fillable = [
		'title',
        'date',
		'location'
	];

	public function evaluationCriteria()
	{
		return $this->hasMany(\App\Models\EvaluationCriterium::class);
	}

	public function interviewees()
	{
		return $this->hasMany(\App\Models\Interviewee::class);
	}

	public function interviewers(){
	    return $this->belongsToMany(User::class,"interviewer_has_interview","interview_id","interviewer_id")->withPivot('evaluation_id');
    }

    public function interviewer_has_interview()
    {
        return $this->hasMany(\App\Models\InterviewerHasInterview::class);
	}
}
