<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class InterviewerHasInterview
 * 
 * @property int $interviewer_id
 * @property int $interview_id
 * @property int $evaluation_id
 * 
 * @property \App\Models\EvaluationCriterium $evaluation_criterium
 * @property \App\Models\Interview $interview
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class InterviewerHasInterview extends Eloquent
{
	protected $table = 'interviewer_has_interview';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'interviewer_id' => 'int',
		'interview_id' => 'int',
		'evaluation_id' => 'int'
	];

    protected $fillable = [
        'interviewer_id',
        'interview_id',
        'evaluation_id'
    ];

	public function evaluation_criterium()
	{
		return $this->belongsTo(\App\Models\EvaluationCriterium::class, 'evaluation_id');
	}

	public function interview()
	{
		return $this->belongsTo(\App\Models\Interview::class);
	}

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'interviewer_id');
	}
}
